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

  let coordinateToMarkers: Map<string, InteractiveMarker> = new Map();
  let markerGroups;

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
    L.control.layers(null, markerGroups).addTo(map);

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
      glitch: L.layerGroup(glitches),
      entrance: L.layerGroup(entrances),
      inactive: L.layerGroup(),
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
    console.log(latLngToKey(leafletMarker.getLatLng()));
    coordinateToMarkers.set(latLng.toString(), {
      data: marker,
      node: leafletMarker,
      isActive: true,
    });

    return leafletMarker;
  }

  function latLngToKey(latLng: L.LatLng) {
    return `${latLng.lat},${latLng.lng}`;
  }

  function onEntranceClick(e: L.LeafletMouseEvent) {
    console.log(this.options.name);
    if (dragStart === null) {
      dragStart = e.latlng;
    } else if (dragStart == e.latlng) {
      toggleMarker(e);
    } else {
      lineBetween(dragStart, e.latlng).addTo(map);
      dragStart = null;
    }
  }

  function toggleMarker(e: L.LeafletMouseEvent) {
    let clickedMarker = coordinateToMarkers.get(latLngToKey(e.latlng));
    clickedMarker.node.removeFrom(map);
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
