<script>
  import Overworld from "./Overworld.svelte";
  import maps from "./mapcontent";
</script>

<div class="pane">
  {#each maps as map}
    <Overworld {...map} />
  {/each}
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    grid-row: 1 / span 14;
    grid-column: 18;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 50% 50%;
    border: white solid 3px;
    margin-bottom: -20px;
    border-radius: 2%;
    box-shadow: 0 0 0 3px $zelda-blue;
  }
</style>
