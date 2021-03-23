<script>
  import Timer from "./Timer.svelte";
  import items from "./items.js";
  import ActiveItemPane from "./ActiveItemPane.svelte";
  import DungeonPane from "./DungeonPane.svelte";
  import Qusb2SnesOutput from "./Qusb2SnesOutput.svelte";
  import MapPane from "./MapPane.svelte";
  import Overworld from "./Overworld.svelte";

  const usableItems = items.filter(
    (item) =>
      item.type === "item" ||
      item.type === "doubleItem" ||
      item.type === "medallion"
  );
  const dungeons = items.filter((item) => item.type === "dungeon");
  console.log("usableItems:", usableItems);
</script>

<main class="Tracker">
  <ActiveItemPane items={usableItems} />
  <DungeonPane items={dungeons} />
  <Timer />
  <Qusb2SnesOutput />
  <MapPane />
</main>

<style type="text/scss">
  $item-pane-width: 340px;
  $item-pane-height: 170px;
  // $border-size: 10px;
  $filler-cell: 34px;
  .Tracker {
    display: grid;
    grid-template-rows: repeat(16, 34px) $filler-cell repeat(3, 34px);
    grid-template-columns: repeat(10, 34px) $filler-cell 16px repeat(4, 34px) $filler-cell 256px;
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
