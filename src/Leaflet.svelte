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

  let mapProp: L.Map | undefined = undefined;
  export { mapProp as map };

  export const invalidateSize = () => map?.invalidateSize();

  const dispatch = createEventDispatcher();

  let map: L.Map | undefined;
  $: mapProp = map;

  export const getMap = () => map;
  setContext("layerGroup", getMap);
  setContext("layer", getMap);
  setContext("map", getMap);

  function toLatLng(xy: Array<number>) {
    let maxLat = imageHeight / mapUnit;
    const latLng = [maxLat - xy[1] / mapUnit, xy[0] / mapUnit];
    return latLng;
  }

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

    let markerLayers = createMarkerGroups(map);
    L.control.layers(null, markerLayers).addTo(map);

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
      .map((marker) => {
        let latLng = toLatLng(marker.xy);
        let positionedMarker = L.latLng(latLng[0], latLng[1]);
        let leafletMarker = L.marker(positionedMarker, {
          icon: iconFor(marker),
        }).bindTooltip(marker.name);
        if (marker.popup !== undefined) {
          leafletMarker.bindPopup(marker.popup);
        }
        return leafletMarker;
      });
    let glitches = markers
      .filter((marker) => marker.type === "glitch")
      .map((marker) => {
        let latLng = toLatLng(marker.xy);
        let positionedMarker = L.latLng(latLng[0], latLng[1]);
        let leafletMarker = L.marker(positionedMarker, {
          icon: iconFor(marker),
        }).bindTooltip(marker.name);
        if (marker.popup !== undefined) {
          leafletMarker.bindPopup(marker.popup);
        }
        return leafletMarker;
      });
    return {
      Glitches: L.layerGroup(glitches),
      Entrances: L.layerGroup(entrances),
    };
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
