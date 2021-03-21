<script>
  import { originalSize } from "./mapcontent";
  export let image;
  export let world;
  export let entrances;

  let renderedSize;

  $: console.log("Rendered size: ", renderedSize);

  function positionInGrid(axisValue) {
    let ratio = originalSize / renderedSize;
    let position = axisValue / ratio / 4;
    console.log("Position: ", position);
    return Math.floor(position);
  }
</script>

<div
  class="MapBox"
  style="background-image: url({image})"
  bind:clientWidth={renderedSize}
>
  <!-- <div class="MapBox"> -->
  {#if renderedSize !== undefined}
    {#each entrances as entrance}
      <span
        style="grid-column-start: {positionInGrid(
          entrance.x
        )}; grid-row-start: {positionInGrid(
          entrance.y
        )}; background-image: url(icons/door-36x36.svg)"
      />
      <!-- <span /> -->
      <!-- <div style="background-image: url(icons/door-36x36.svg)" /> -->
    {/each}
  {/if}
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .MapBox {
    background-size: contain;
    grid-row-end: span 1;
    grid-column-end: span 1;

    display: grid;
    grid-template-columns: repeat($map-cell-total, $map-cell-size);
    grid-template-rows: repeat($map-cell-total, $map-cell-size);
  }

  span {
    // background: 1em 1em no-repeat;
    background-size: cover;
    outline: rgb(209, 7, 220) solid 1px;
  }

  .door {
    fill: yellow;
    opacity: 1;
  }
</style>
