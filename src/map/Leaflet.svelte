<script lang="typescript">
  import { createEventDispatcher, setContext } from "svelte";
  import * as L from "leaflet";
  import { iconFor, imageHeight, mapUnit } from "./mapcontent";
  import type { MarkerData, InteractiveMarker } from "./mapcontent";
  import "leaflet/dist/leaflet.css";
  import EntranceMarkerPopup from "./EntranceMarkerPopup.svelte";
  import { isLeafletPoint } from "./leafletutil";
  import type { LatLngPoint } from "./leafletutil";

  export let image: string;
  export let markers: Array<MarkerData>;
  export let height = "100%";
  export let width = "100%";

  let bounds = L.latLngBounds([0, 0], [256, 512]);
  let map: L.Map | undefined;
  export const invalidateSize = () => map?.invalidateSize();
  const dispatch = createEventDispatcher();
  export const getMap = () => map;
  setContext("layerGroup", getMap);
  setContext("layer", getMap);
  setContext("map", getMap);

  let controlLayer = L.control.layers(null, null);
  let layerGroups: {
    entrance: L.LayerGroup;
    glitch: L.LayerGroup;
    inactive: L.LayerGroup;
  };
  let coordinateToMarkers: Map<string, InteractiveMarker> = new Map();
  let markerGroups: {
    entrance: Array<InteractiveMarker>;
    glitch: Array<InteractiveMarker>;
    inactive: Array<InteractiveMarker>;
  };

  let dragStart: InteractiveMarker = null;

  function createLeaflet(node: HTMLElement) {
    map = L.map(node, { crs: L.CRS.Simple, minZoom: 0 })
      .fitBounds(bounds)
      .on("zoom", (e) => dispatch("zoom", e))
      .on("contextmenu", () => {});
    setTimeout(() => {
      if (map) {
        map.invalidateSize();
        map.fitBounds(bounds);
      }
    }, 250);

    let halfSize = 256;
    L.imageOverlay(image, [
      [0, 0],
      [halfSize, halfSize * 2],
    ]).addTo(map);

    markerGroups = createMarkerGroups();

    // Layer groups
    layerGroups = {
      entrance: L.layerGroup(markerGroups.entrance.map((m) => m.node)),
      glitch: L.layerGroup(markerGroups.glitch.map((m) => m.node)),

      inactive: L.layerGroup(markerGroups.inactive.map((m) => m.node)),
    };

    Object.entries(layerGroups).forEach((entry) => {
      const [key, value] = entry;
      controlLayer.addOverlay(value, key);
    });

    controlLayer.addTo(map);
    return {
      destroy() {
        map!.remove();
        map = undefined;
      },
    };
  }

  function createMarkerGroups() {
    let entrances = markers
      .filter((marker) => marker.type === "entrance")
      .map((m) =>
        createLeafletMarker(m, [
          { eventType: "mousedown", fn: onEntranceClick },
          { eventType: "contextmenu", fn: onContextMenu },
        ])
      );
    let glitches = markers
      .filter((marker) => marker.type === "glitch")
      .map((marker) => createLeafletMarker(marker));
    return {
      glitch: glitches,
      entrance: entrances,
      inactive: [],
    };
  }

  // Define every marker on the map and add to map for coordinate based lookups
  function createLeafletMarker(
    marker: MarkerData,
    eventHandlers: Array<{
      eventType: string;
      fn: L.LeafletEventHandlerFn;
    }> = []
  ) {
    let latLng = toLatLng(marker.xy);
    let positionedMarker = L.latLng(latLng[0], latLng[1]);
    let leafletMarker = L.marker(positionedMarker, {
      icon: iconFor(marker),
    });
    eventHandlers.forEach((e) => {
      leafletMarker.on(e.eventType, e.fn);
    });
    const interactiveMarker = {
      data: marker,
      node: leafletMarker,
      isActive: true,
    };

    interactiveMarker.node.bindTooltip(marker.name);
    if (marker.popup !== undefined) {
      interactiveMarker.node.bindPopup(marker.popup);
    } else if (marker.type === "entrance") {
      bindPopup(interactiveMarker, (m: any) => {
        let c = new EntranceMarkerPopup({
          target: m,
        });
        c.$on("connect", () => {
          dragStart = interactiveMarker;
          console.log(dragStart);
        });
      });
    }

    coordinateToMarkers.set(latLng.toString(), interactiveMarker);

    return interactiveMarker;
  }

  function latLngToKey(latLng: L.LatLng) {
    return `${latLng.lat},${latLng.lng}`;
  }

  function onEntranceClick(e: L.LeafletMouseEvent) {
    console.log("onEntranceclick:", e);
    if (e.originalEvent.button === 0) {
      // 0 = Left Mouse
      if (dragStart !== null && dragStart.node.getLatLng() !== e.latlng) {
        lineBetween(dragStart.node.getLatLng(), e.latlng).addTo(map);
      }
    } else if (e.originalEvent.button === 2) {
      // Right mouse
      toggleMarker(e);
    }
    resetActionState();
  }

  function resetActionState() {
    dragStart = null;
  }

  function toggleMarker(clickedMarker: InteractiveMarker | LatLngPoint) {
    if (isLeafletPoint(clickedMarker)) {
      clickedMarker = coordinateToMarkers.get(
        latLngToKey(clickedMarker.latlng)
      );
    }
    if (clickedMarker.isActive) {
      layerGroups.entrance.removeLayer(clickedMarker.node);
      layerGroups.inactive.addLayer(clickedMarker.node);
      clickedMarker.isActive = false;
    } else {
      layerGroups.inactive.removeLayer(clickedMarker.node);
      layerGroups.entrance.addLayer(clickedMarker.node);
      clickedMarker.isActive = true;
      // clickedMarker.node.setIcon(mar);
    }
    clickedMarker.node.setIcon(iconFor(clickedMarker));
  }

  function onContextMenu(e: L.LeafletMouseEvent) {}

  function toLatLng(xy: Array<number>) {
    let maxLat = imageHeight / mapUnit;
    const latLng = [maxLat - xy[1] / mapUnit, xy[0] / mapUnit];
    return latLng;
  }

  function lineBetween(m1: L.Marker | L.LatLng, m2: L.Marker | L.LatLng) {
    let point1 = m1 instanceof L.Marker ? m1.getLatLng() : m1;
    let point2 = m2 instanceof L.Marker ? m2.getLatLng() : m2;
    return L.polyline([point1, point2]);
  }

  function bindPopup(marker: InteractiveMarker, createFn) {
    let popupComponent: any;
    marker.node.bindPopup(() => {
      let container = L.DomUtil.create("div");
      popupComponent = createFn(container);
      return container;
    });

    marker.node.on("popupclose", () => {
      if (popupComponent) {
        let old = popupComponent;
        popupComponent = null;
        // Wait to destroy until after the fadeout completes.
        setTimeout(() => {
          old.$destroy();
        }, 500);
      }
    });
  }

  $: map?.fitBounds(bounds);
</script>

<div class="pane" style="height:{height};width:{width}" use:createLeaflet>
  {#if map}
    <slot {map} />
  {/if}
</div>

<style type="text/scss">
  :global(.leaflet-control-container) {
    position: static;
  }
</style>
