<script>
  import ItemBox from './boxes/ItemBox.svelte';
  import DungeonBox from './boxes/DungeonBox.svelte';
  import FillerBox from './boxes/FillerBox.svelte';
  import MedallionBox from './boxes/MedallionBox.svelte';
  import Timer from './Timer.svelte'
  import items from './items.js'
  import KeysanityBox from './boxes/KeysanityBox.svelte';
import ActiveItemPane from './ActiveItemPane.svelte';

  const usableItems = items.filter(item => item.type === 'item' || item.type === 'doubleItem' || item.type === 'medallion')
  const dungeons = items.map(item => item.type === 'dungeon')
  console.log('usableItems:', usableItems)
</script>

<!-- {#each items as item}
  {#if item.type === 'item' || item.type === 'doubleItem'}
    <ItemBox {...item}/>
  {:else if item.type === 'dungeon'}
    <KeysanityBox {...item}/>
  {:else if item.type === 'medallion'}
    <MedallionBox {...item}/>
  {:else}
    <FillerBox/>
  {/if}
{/each} -->
<main class='Tracker'>
  <ActiveItemPane items={usableItems}/>
  <Timer/>
</main>

<style type="text/scss">
  $item-pane-border-size: 40px;
  $item-pane-width: 340px;
  $item-pane-height: 170px;
  .Tracker {
    display: grid;
    /* grid-template-columns: 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px; */
    grid-template-columns: $item-pane-width + $item-pane-border-size $item-pane-height + $item-pane-border-size;
    grid-template-rows: 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px 34px;
    // padding-top: 10px;
    color: lightgrey;
    width: fit-content;
    height: fit-content;
  }

  :global(.inactive) {
    opacity: 0.6;
    filter: grayscale(1.0);
  }

</style>