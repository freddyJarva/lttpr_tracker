<script>
  import Timer from './Timer.svelte'
  import items from './items.js'
  import ActiveItemPane from './ActiveItemPane.svelte';
  import DungeonPane from './DungeonPane.svelte';

  const usableItems = items.filter(item => item.type === 'item' || item.type === 'doubleItem' || item.type === 'medallion')
  const dungeons = items.filter(item => item.type === 'dungeon')
  console.log('usableItems:', usableItems)
</script>

<main class='Tracker'>
  <div class="item-pane-border"></div>
  <ActiveItemPane items={usableItems}/>
  <div class='dungeon-pane-border'></div>
  <DungeonPane items={dungeons}/>
  <div class='timer-pane-border'></div>
  <Timer/>
</main>

<style type="text/scss">
  $item-pane-width: 340px;
  $item-pane-height: 170px;
  // $border-size: 10px;
  $filler-cell : 34px;
  .Tracker {
    display: grid;
    grid-template-rows: repeat(10, 34px) $filler-cell repeat(3, 34px);
    grid-template-columns: repeat(10, 34px) $filler-cell 16px repeat(4, 34px);  
    padding-top: 10px;
    color: lightgrey;
    width: fit-content;
    height: fit-content;

    .item-pane-border {
      grid-row: 1 / span 10;
      grid-column: 1 / span 11;
      border: white solid 2px;
      margin: 3px;
      margin-bottom: -17px;
      border-radius: 5px;
    }

    .dungeon-pane-border {
      grid-row: 1 / span 15;
      grid-column: 13 / span 5;
      border: white solid 4px;
      margin: 1px;
      margin-right: -15px;
      border-radius: 5px;
    }

    .timer-pane-border {
      grid-row: 12 / span 3;
      grid-column: 1 / span 11;
      border: white solid 4px;
      margin: 1px;
      border-radius: 5px;
    }
  }


  :global(.inactive) {
    opacity: 0.6;
    filter: grayscale(1.0);
  }

</style>