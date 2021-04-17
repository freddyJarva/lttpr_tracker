<script lang="ts">
  import type { MapObject } from "../map/store";
  import DungeonNote from "./DungeonNote.svelte";

  export let notes: Array<MapObject>;
</script>

<div class="pane">
  {#each notes as note (note.entranceId)}
    <DungeonNote {...note} />
  {/each}
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    grid-column-start: notecolumn-start;
    grid-row: span 14;
    padding-top: 10px;

    display: grid;
    grid-template-rows: $dungeon-pane-rows;
    grid-template-columns: 1;
  }
</style>
