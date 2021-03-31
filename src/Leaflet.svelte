<script lang="typescript">
  import { createEventDispatcher, setContext } from "svelte";
  import * as L from "leaflet";
  import { iconFor, imageHeight, mapUnit } from "./mapcontent";
  import type { MarkerData } from "./mapcontent";
  import "leaflet/dist/leaflet.css";

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
  interface InteractiveMarker {
    data: MarkerData;
    node: L.Marker;
    isActive: boolean;
  }

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

  let dragStart: L.LatLng = null;

  function createLeaflet(node: HTMLElement) {
    map = L.map(node, { crs: L.CRS.Simple, minZoom: 0 })
      .fitBounds(bounds)
      .on("zoom", (e) => dispatch("zoom", e));
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
    }).bindTooltip(marker.name);
    if (marker.popup !== undefined) {
      leafletMarker.bindPopup(marker.popup);
    }
    eventHandlers.forEach((e) => {
      leafletMarker.on(e.eventType, e.fn);
    });
    const interactiveMarker = {
      data: marker,
      node: leafletMarker,
      isActive: true,
    };

    coordinateToMarkers.set(latLng.toString(), interactiveMarker);

    return interactiveMarker;
  }

  function latLngToKey(latLng: L.LatLng) {
    return `${latLng.lat},${latLng.lng}`;
  }

  function onEntranceClick(e: L.LeafletMouseEvent) {
    console.log("onEntranceClick");
    if (dragStart === null) {
      dragStart = e.latlng;
    } else if (dragStart == e.latlng) {
      toggleMarker(e);
      dragStart = null;
    } else {
      lineBetween(dragStart, e.latlng).addTo(map);
      dragStart = null;
    }
  }

  function toggleMarker(e: L.LeafletMouseEvent) {
    let clickedMarker = coordinateToMarkers.get(latLngToKey(e.latlng));
    if (clickedMarker.isActive) {
      layerGroups.entrance.removeLayer(clickedMarker.node);
      layerGroups.inactive.addLayer(clickedMarker.node);
      clickedMarker.isActive = false;
    } else {
      layerGroups.inactive.removeLayer(clickedMarker.node);
      layerGroups.entrance.addLayer(clickedMarker.node);
      clickedMarker.isActive = true;
    }
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
