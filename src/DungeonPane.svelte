<script>
  import KeysanityBox from './boxes/KeysanityBox.svelte';

  export let items;
</script>

<div class="pane">
  <div class="bullshit-border"></div>
  {#each items as item}
    <KeysanityBox {...item}/>
  {/each}
</div>

<style>
  .pane {
    grid-row: 1 / span 14;
    grid-column: 13 / span 4;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(13, 35px);
    padding-top: 10px;
    padding-left: 16px;
    padding-right: 16px;
    margin-right: -16px;
    border-radius: 5px;
    border: red solid 3px;
  }

</style>