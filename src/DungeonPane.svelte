<script>
  import KeysanityBox from "./boxes/KeysanityBox.svelte";

  export let items;
</script>

<div class="pane">
  <div class="bullshit-border" />
  {#each items as item}
    <KeysanityBox {...item} />
  {/each}
</div>

<style type="text/scss">
  @import "src/theme.scss";
  .pane {
    grid-row: 1 / span 14;
    grid-column: 13 / span 4;
    display: grid;
    grid-template-columns: $dungeon-pane-columns;
    grid-template-rows: $dungeon-pane-rows;
    padding-top: 10px;
    padding-left: 16px;
    padding-right: 16px;
    margin-right: -16px;
    border-radius: 5px;
    box-shadow: 0 0 0 3px red;
    border: white solid 3px;
  }
</style>
