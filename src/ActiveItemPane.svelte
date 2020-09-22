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

<style type="text/scss">
  @import 'src/theme.scss';
  .pane {
    grid-row: 1 / span 10;
    grid-column: 1 / span 11;
    display: grid;
    grid-template-columns: repeat(10, 34px) 10px;
    grid-template-rows: repeat(10, 34px) 10px;
    border: $zelda-green solid 3px;
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom: -20px;
    border-radius: 2%;
  }
</style>