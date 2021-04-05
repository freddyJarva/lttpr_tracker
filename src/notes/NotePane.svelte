<script>
  import NoteItem from "./NoteItem.svelte";

  let notes = [0, 1];
</script>

<div class="pane">
  {#each notes as note}
    <NoteItem />
  {/each}
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    grid-row: 16 / span 10;
    grid-column: 18;
    display: flex;
    flex-direction: column;
    border: white solid 3px;
    border-radius: 2%;
    box-shadow: 0 0 0 3px $zelda-blue;
  }
</style>
