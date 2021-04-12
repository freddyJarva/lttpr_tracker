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
    display: flex;
    flex-flow: row wrap;
    gap: 4px 4px;
  }
</style>
