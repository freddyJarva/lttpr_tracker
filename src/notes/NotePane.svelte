<script lang="ts">
  import NoteItem from "./NoteItem.svelte";
  import type { MapComponentObject } from "../map/store";

  export let notes: Array<MapComponentObject>;
</script>

<div class="pane">
  {#each notes as note (note.entranceId)}
    <NoteItem {...note} />
  {/each}
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    // grid-row: 16 / span 10;
    grid-row: 16 / span 10;
    grid-column: 18;
    display: grid;
    grid-template-columns: repeat(8, 12.5%);
    grid-template-rows: repeat(5, 20%);
    gap: 4px 4px;
  }
</style>
