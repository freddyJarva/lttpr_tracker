<script lang="ts">
  import { selectTextOnFocus, blurOnEscape } from "./inputDirectives";
  import NoteItem from "./NoteItem.svelte";
  import { MapObject } from "../map/store";
  import { tick } from "svelte";

  export let notes: Array<MapObject>;

  let newNoteText: string = "new note..";

  function addNote(e: KeyboardEvent) {
    if (e.key === "Enter") {
      let note = new MapObject(null, null, newNoteText);
      notes = [...notes, note];
      newNoteText = "";
    }
  }
</script>

<div class="pane">
  {#each notes as note}
    <NoteItem {...note} />
  {/each}
  <input
    class="note-input"
    use:selectTextOnFocus
    use:blurOnEscape
    type="text"
    bind:value={newNoteText}
    on:keydown={addNote}
  />
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    display: flex;
    flex-flow: row wrap;
    gap: 4px 4px;
    margin-bottom: 8px;
  }

  .note-input {
    max-width: 140px;
    font-size: 14px;

    text-align: center;

    padding: 4px 8px 4px 10px;
    margin-bottom: 8px;

    border-radius: 6%;
    font-size: 14px;
    font-family: "Press Start 2P";
  }
</style>
