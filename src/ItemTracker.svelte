<script>
  import Timer from "./Timer.svelte";
  import ActiveItemPane from "./ActiveItemPane.svelte";
  import DungeonPane from "./DungeonPane.svelte";

  import items from "./items.js";
  import DungeonNotePane from "./notes/DungeonNotePane.svelte";
  import { mapComponentObjects } from "./map/store";

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
  <DungeonNotePane notes={$mapComponentObjects} />
  <Timer />
</div>

<style type="text/scss">
  $filler-cell: 34px;

  $core-tracker-grid-rows: repeat(15, 34px);
  $core-tracker-grid-columns: repeat(10, 34px) $filler-cell 16px repeat(4, 34px);
  $note-grid-columns: 34 * 4px;

  .ItemTracker {
    grid-row: 1;
    display: grid;
    grid-template-rows: $core-tracker-grid-rows;
    grid-template-columns: $core-tracker-grid-columns $filler-cell [notecolumn-start] $note-grid-columns;

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
