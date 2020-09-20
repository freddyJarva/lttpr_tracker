<script>
  import ItemBox from './boxes/ItemBox.svelte';
  import DungeonBox from './boxes/DungeonBox.svelte';
  import FillerBox from './boxes/FillerBox.svelte';
  import MedallionBox from './boxes/MedallionBox.svelte';
  import items from './items.js'
</script>

<main class='Tracker'>
  {#each items as item}
    {#if item.type === 'item' || item.type === 'doubleItem'}
      <ItemBox {...item}/>
    {:else if item.type === 'dungeon'}
      <DungeonBox {...item}/>
    {:else if item.type === 'medallion'}
      <MedallionBox {...item}/>
    {:else}
      <FillerBox/>
    {/if}
  {/each}
</main>

<style>
  .Tracker {
    display: grid;
    grid-template-columns: 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px;
    grid-template-rows: 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px;
    padding-top: 10px;
    color: lightgrey;
    width: fit-content;
    height: fit-content;
    font-family: 'Press Start 2P';
  }

  :global(.inactive) {
    opacity: 0.6;
  	filter: grayscale(1.0)
  }
</style>