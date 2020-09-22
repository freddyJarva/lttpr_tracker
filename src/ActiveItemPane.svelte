<script>
import ItemBox from "./boxes/ItemBox.svelte";
import MedallionBox from "./boxes/MedallionBox.svelte";

  export let items;

  console.log(items)
</script>

<div class="pane">
  {#each items as item}
    {#if item.type === 'medallion'}
      <MedallionBox {...item}/>
    {:else}
      <ItemBox {...item}/>
    {/if}
  {/each}
</div>

<style>
  .pane {
    padding: 10px;
    /* padding-bottom: 20px; */
    margin-bottom: -20px;
    grid-row: 1 / span 10;
    grid-column: 1 / span 1;
    display: grid;
    grid-template-columns: repeat(10, 34px);
    grid-template-rows: repeat(10, 34px);
    border: white solid 3px;
    border-radius: 2%;
  }
</style>