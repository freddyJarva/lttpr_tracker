<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import type { Writable } from "svelte/store";
  const dispatch = createEventDispatcher();

  export let notes: Writable<string>;

  function connect() {
    dispatch("connect");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch("close");
    }
  }

  async function setFocus(el: HTMLElement) {
    await tick();
    el.focus();
  }
</script>

<div class="map-popup">
  <button on:click={connect}>Connect</button>
  <div
    class="marker-notes"
    contenteditable="true"
    bind:textContent={$notes}
    use:setFocus
    on:keydown={handleKeyDown}
  />
</div>

<style>
  .map-popup {
    display: grid;
    grid-template-columns: 60px 60px;
    grid-template-rows: 40px auto;
  }
  button {
    grid-column-start: span 1;
    grid-row-start: 1;

    height: 2rem;
  }
  .marker-notes {
    border: 1px solid black;
    padding: 4px;
    font-size: 1em;
    grid-column-start: span 3;
    grid-row-start: 2;
  }
</style>
