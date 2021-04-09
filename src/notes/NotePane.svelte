<script lang="ts">
  import NoteItem from "./NoteItem.svelte";
  import type { MapComponentObject } from "../map/store";

  export let notes: Array<MapComponentObject>;
</script>

<div class="pane">
  {#each notes as note}
    <NoteItem
      entrance={note.entranceName}
      text={note.noteText}
      iconImg={note.img}
    />
  {/each}
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    grid-row: 16 / span 10;
    grid-column: 18;
    display: flex;
    flex-direction: column;
  }
</style>
