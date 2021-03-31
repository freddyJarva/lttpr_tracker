<script>
  import Leaflet from "./Leaflet.svelte";
  import mapContent from "./mapcontent";

  let loaded = false;
</script>

<svelte:window on:load={() => (loaded = true)} />

<div class="pane">
  {#if loaded || document.readyState === "complete"}
    <Leaflet {...mapContent} />
  {/if}
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
</style>
