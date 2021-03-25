<script lang="typescript">
  import { createEventDispatcher, setContext } from "svelte";
  import * as L from "leaflet";
  import { imageHeight, mapUnit } from "./mapcontent";

  export let image;
  export let markers;
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
    console.log(latLng);
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

    // Add markers to the map
    markers.forEach((marker) => {
      let latLng = toLatLng(marker.xy);
      console.log(latLng);
      let positionedMarker = L.latLng(latLng[0], latLng[1]);
      L.marker(positionedMarker).addTo(map);
    });

    return {
      destroy() {
        map!.remove();
        map = undefined;
      },
    };
  }

  $: map?.fitBounds(bounds);
</script>

<div class="pane" style="height:{height};width:{width}" use:createLeaflet>
  {#if map}
    <slot {map} />
  {/if}
</div>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>

<style type="text/scss">
  :global(.leaflet-control-container) {
    position: static;
  }
</style>
