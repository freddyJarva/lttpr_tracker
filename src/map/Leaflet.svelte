<script lang="typescript">
  import { createEventDispatcher, setContext } from "svelte";
  import * as L from "leaflet";
  import { imageHeight, mapUnit } from "./mapcontent";
  import { CustomMarker } from "./markers";
  import type {
    CustomMarkerOptions,
    InteractiveMarker,
    MarkerData,
  } from "./markers";

  import "leaflet/dist/leaflet.css";
  import EntranceMarkerPopup from "./EntranceMarkerPopup.svelte";
  import { isLeafletPoint } from "./leafletutil";
  import type { LatLngPoint } from "./leafletutil";
  import { writable } from "svelte/store";
  import { iconFor } from "./icons";
  import { mouseX, mouseY, mapComponentObjects, MapObject } from "./store";
  import { lineBetween } from "./line";
  import ItemMarkerPopup from "./ItemMarkerPopup.svelte";

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
    item: L.LayerGroup;
    inactive: L.LayerGroup;
    glitch: L.LayerGroup;
  };

  let coordinateToMarkers: Map<string, InteractiveMarker> = new Map();
  let markerGroups: {
    entrance: Array<InteractiveMarker>;
    item: Array<InteractiveMarker>;
    inactive: Array<InteractiveMarker>;
    glitch: Array<InteractiveMarker>;
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

    // Track mouse coordinates
    map.addEventListener("mousemove", function (ev: L.LeafletMouseEvent) {
      const [x, y] = toXY([ev.latlng.lat, ev.latlng.lng]);
      $mouseX = x;
      $mouseY = y;
    });

    let halfSize = 256;
    L.imageOverlay(image, [
      [0, 0],
      [halfSize, halfSize * 2],
    ]).addTo(map);

    markerGroups = createMarkerGroups();

    // Layer groups
    layerGroups = {
      entrance: L.layerGroup(markerGroups.entrance.map((m) => m.node)),
      item: L.layerGroup(markerGroups.item.map((m) => m.node)),
      inactive: L.layerGroup(markerGroups.inactive.map((m) => m.node)),
      glitch: L.layerGroup(markerGroups.glitch.map((m) => m.node)),
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
    let items = markers
      .filter((marker) => marker.type === "item")
      .map((m) =>
        createLeafletMarker(m, [
          { eventType: "mousedown", fn: onEntranceClick },
          { eventType: "contextmenu", fn: onContextMenu },
        ])
      );
    return {
      glitch: glitches,
      item: items,
      inactive: [],
      entrance: entrances,
    };
  }

  // Define every marker on the map and add to map for coordinate based lookups
  function createLeafletMarker(
    marker: MarkerData,
    eventHandlers: Array<{
      eventType: string;
      fn: L.LeafletEventHandlerFn;
    }> = [],
    className?: string
  ) {
    let latLng = toLatLng(marker.xy);
    let positionedMarker = L.latLng(latLng[0], latLng[1]);

    // Option creation
    let options: CustomMarkerOptions = {
      icon: iconFor(marker),
      id: marker.id,
      active: true,
    };
    if (className) {
      options.className = className;
    }

    let leafletMarker = new CustomMarker(positionedMarker, options);

    eventHandlers.forEach((e) => {
      leafletMarker.on(e.eventType, e.fn);
    });
    const interactiveMarker: InteractiveMarker = {
      data: marker,
      node: leafletMarker,
      isActive: true,
    };

    const mapComponent = new MapObject(
      interactiveMarker.data.name,
      interactiveMarker.data.id
    );

    // Object to reuse at other places, like notepane for example.
    $mapComponentObjects = [...$mapComponentObjects, mapComponent];

    interactiveMarker.node.bindTooltip(marker.name);
    if (marker.popup !== undefined) {
      interactiveMarker.node.bindPopup(marker.popup);
    } else if (marker.type === "entrance") {
      bindPopup(interactiveMarker, (m: any) => {
        let c = new EntranceMarkerPopup({
          target: m,
          props: {
            notes: mapComponent.text,
            img: mapComponent.img,
          },
        });
        c.$on("connect", () => {
          dragStart = interactiveMarker;
          interactiveMarker.node.closePopup();
          console.log("Start making line");
        });
        c.$on("close", () => {
          interactiveMarker.node.closePopup();
        });
        c.$on("seticon", (iconEvent) => {
          interactiveMarker.node.setIcon(L.icon(iconEvent.detail));
          interactiveMarker.node.closePopup();
        });
      });
    } else if (marker.type === "item") {
      bindPopup(interactiveMarker, (m: any) => {
        let c = new ItemMarkerPopup({
          target: m,
          props: {
            notes: mapComponent.text,
          },
        });
        c.$on("close", () => {
          interactiveMarker.node.closePopup();
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
    if (e.originalEvent.button === 0) {
      // 0 = Left Mouse
      if (dragStart !== null && dragStart.node.getLatLng() !== e.latlng) {
        let line = lineBetween(dragStart.node.getLatLng(), e.latlng);
        line
          .on("click", (e) => {
            line.remove();
          })
          .addTo(map);

        // Super ugly way to make sure popup doesn't open when clicking on endpoint for the line
        setTimeout(() => {
          coordinateToMarkers.get(latLngToKey(e.latlng)).node.closePopup();
        }, 100);
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
      clickedMarker.data.type == "entrance"
        ? layerGroups.entrance.removeLayer(clickedMarker.node)
        : layerGroups.item.removeLayer(clickedMarker.node);
      clickedMarker.isActive = false;
      clickedMarker.node.deactivate();
      layerGroups.inactive.addLayer(clickedMarker.node);
    } else {
      layerGroups.inactive.removeLayer(clickedMarker.node);

      clickedMarker.isActive = true;
      clickedMarker.node.activate();

      clickedMarker.data.type == "entrance"
        ? layerGroups.entrance.addLayer(clickedMarker.node)
        : layerGroups.item.addLayer(clickedMarker.node);
    }
  }

  function onContextMenu(e: L.LeafletMouseEvent) {}

  function toLatLng(xy: Array<number>) {
    let maxLat = imageHeight / mapUnit;
    const latLng = [maxLat - xy[1] / mapUnit, xy[0] / mapUnit];
    return latLng;
  }

  function toXY(latLng: Array<number>) {
    return [
      Math.round(latLng[1] * mapUnit),
      Math.round(imageHeight - latLng[0] * mapUnit),
    ];
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
