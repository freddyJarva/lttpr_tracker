<script lang="ts">
  import Qusb2SnesOutput from "./Qusb2SnesOutput.svelte";
  import MapPane from "./map/MapPane.svelte";
  import NotePane from "./notes/NotePane.svelte";
  import { mapComponentObjects } from "./map/store";
  import ItemTracker from "./ItemTracker.svelte";
  import Debug from "./Debug.svelte";
</script>

<main class="Tracker">
  <ItemTracker />
  <MapPane />
  <NotePane notes={$mapComponentObjects} />
  <Qusb2SnesOutput />
  <Debug />
</main>

<style>
  .Tracker {
    display: grid;
    grid-template-rows: auto 600px auto auto;
  }
</style>
