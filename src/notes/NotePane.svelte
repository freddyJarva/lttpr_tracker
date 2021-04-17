<script lang="ts">
  import NoteItem from "./NoteItem.svelte";
  import type { MapObject } from "../map/store";

  export let notes: Array<MapObject>;
</script>

<div class="pane">
  {#each notes as note (note.entranceId)}
    <NoteItem {...note} />
  {/each}
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    display: flex;
    flex-flow: row wrap;
    gap: 4px 4px;
  }
</style>
