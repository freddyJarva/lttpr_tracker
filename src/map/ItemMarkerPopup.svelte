<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import type { Writable } from "svelte/store";

  const dispatch = createEventDispatcher();

  export let notes: Writable<string>;
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

<div class="choose-action">
  <div
    class="marker-notes"
    contenteditable="true"
    bind:textContent={$notes}
    use:setFocus
    on:keydown={handleKeyDown}
  />
</div>

<style>
  .choose-action {
    display: grid;
    grid-template-columns: 60px 60px;
    grid-template-rows: 40px auto;
  }

  .marker-notes {
    border: 1px solid black;
    padding: 4px;
    font-size: 1em;
    grid-column-start: span 3;
    grid-row-start: 2;
    background: whitesmoke;
  }
</style>
