<script>
  import Timer from "./Timer.svelte";
  import ActiveItemPane from "./ActiveItemPane.svelte";
  import DungeonPane from "./DungeonPane.svelte";

  import items from "./items.js";

  const usableItems = items.filter(
    (item) =>
      item.type === "item" ||
      item.type === "doubleItem" ||
      item.type === "medallion"
  );
  const dungeons = items.filter((item) => item.type === "dungeon");
</script>

<div class="ItemTracker">
  <ActiveItemPane items={usableItems} />
  <DungeonPane items={dungeons} />
  <Timer />
</div>

<style type="text/scss">
  $item-pane-width: 340px;
  $item-pane-height: 170px;
  $filler-cell: 34px;
  .ItemTracker {
    grid-row: 1;
    display: grid;
    grid-template-rows: repeat(15, 34px);
    // $filler-cell repeat(3, 34px);
    grid-template-columns: repeat(10, 34px) $filler-cell 16px repeat(4, 34px);
    // grid-template-rows: repeat(16, 34px) $filler-cell repeat(3, 34px);
    // grid-template-columns: repeat(10, 34px) $filler-cell 16px repeat(4, 34px) $filler-cell 512px;
    padding-top: 10px;
    color: lightgrey;
    width: fit-content;
    height: fit-content;
  }

  :global(.inactive) {
    opacity: 0.6;
    filter: grayscale(1);
  }
</style>
