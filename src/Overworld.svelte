<script>
  import { referenceSize } from "./mapcontent";
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
</script>

<div
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
        data="icons/chest-16px.svg"
        style="left: {position(item).x}px;
          top: {position(item)
          .y}px;"
      />
    {/each}
  {/if}
  <span>X: {m.x}, Y: {m.y}</span>
</div>

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
