<script>
  import Leaflet from "./Leaflet.svelte";
  import mapContent from "./mapcontent";

  let loaded = false;

  let m = { x: 0, y: 0 };

  function handleMousemove(event) {
    m.x = event.offsetX;
    m.y = event.offsetY;
  }
</script>

<svelte:window on:load={() => (loaded = true)} />

<div class="pane" on:mousemove={handleMousemove}>
  {#if loaded || document.readyState === "complete"}
    <Leaflet {...mapContent} />
  {/if}

  <span>X: {m.x}, Y: {m.y}</span>
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    grid-row: 1 / span 14;
    grid-column: 18;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    border: white solid 3px;
    margin-bottom: -20px;
    border-radius: 2%;
    box-shadow: 0 0 0 3px $zelda-blue;
  }

  span {
    margin-top: 10px;
  }
</style>
