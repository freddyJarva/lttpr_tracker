<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";

  let map;
  let img;
  let layers = {};

  export let image;
  export let world;
  export let entrances;
  export let items;

  let iconLength = 8;
  let containerW;
  let containerH;

  $: console.log("Rendered size: ", containerW);

  function calculateAxis(val, axisLength) {
    let ratio = referenceSize / axisLength;
    return Math.floor(val / ratio);
  }

  function position(point) {
    return {
      x: calculateAxis(point.x, containerW) - iconLength / 2,
      y: calculateAxis(point.y, containerH) + iconLength / 2,
    };
  }

  let m = { x: 0, y: 0 };

  function handleMousemove(event) {
    m.x = event.offsetX;
    m.y = event.offsetY;
  }

  function createMap(container) {
    let m = L.map(container, {
      crs: L.CRS.Simple,
      center: [2048, 2048],
      zoom: 4,
      maxBounds: [
        [0, 0],
        [4096, 4096],
      ],
    });
    // img = L.imageOverlay(image, bounds).addTo(m);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      crs: L.CRS.EPSG4326,
    }).addTo(m);
    return m;
  }

  function mapAction(container) {
    map = createMap(container);
    return {
      destroy: () => {
        map.remove();
      },
    };
  }

  function resizeMap() {
    if (map) {
      map.invalidateSize();
    }
  }
</script>

<svelte:head>
  <!-- In the REPL you need to do this. In a normal Svelte app, use a CSS Rollup plugin and import it from the leaflet package. -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""
  />
</svelte:head>

<svelte:window on:resize={resizeMap} />

<!-- <div
  class="MapBox"
  style="background-image: url({image})"
  bind:clientWidth={containerW}
  bind:clientHeight={containerH}
  on:mousemove={handleMousemove}
>
  {#if containerW !== undefined}
    {#each entrances as entrance}
      <object
        type="image/svg+xml"
        data="icons/door-8px.svg"
        style="left: {position(entrance).x}px;
              top: {position(
          entrance
        ).y}px;"
      />
    {/each}
    {#each items as item}
      <object
        type="image/svg+xml"
        data="icons/chest-closed.svg"
        style="left: {position(item).x}px;
          top: {position(item).y}px;"
      />
    {/each}
  {/if}
  <span>X: {m.x}, Y: {m.y}</span>
</div> -->

<div style="height:256px;width:100%" use:mapAction />

<style type="text/scss">
  @import "src/theme.scss";

  .MapBox {
    background-size: contain;
    grid-row-end: span 1;
    grid-column-end: span 1;

    position: relative;
  }

  object {
    position: absolute;
    width: 8px;
  }
</style>
