<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import type { Writable } from "svelte/store";
  import { iconDataList } from "./icons";
  const dispatch = createEventDispatcher();

  export let notes: Writable<string>;

  let isChoosingIcon = false;

  function connect() {
    dispatch("connect");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch("close");
    }
  }

  function chooseIcon() {
    isChoosingIcon = true;
  }

  function setIcon(e, icon) {
    dispatch("seticon", icon);
    isChoosingIcon = false;
  }

  async function setFocus(el: HTMLElement) {
    await tick();
    el.focus();
  }
</script>

{#if isChoosingIcon}
  <div class="choose-icon">
    {#each iconDataList as icon}
      <img
        src={icon.iconUrl}
        alt={icon.name ? icon.name : "unknown"}
        on:click={(e) => setIcon(e, icon)}
      />
    {/each}
  </div>
{:else}
  <div class="choose-action">
    <button on:click={connect}>LINE</button>
    <button on:click={chooseIcon}>ICON</button>
    <div
      class="marker-notes"
      contenteditable="true"
      bind:textContent={$notes}
      use:setFocus
      on:keydown={handleKeyDown}
    />
  </div>
{/if}

<style>
  .choose-icon {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: auto;
  }

  .choose-icon img {
    max-height: 50px;
    max-width: 90%;
    align-self: center;
  }
  .choose-action {
    display: grid;
    grid-template-columns: 60px 60px;
    grid-template-rows: 40px auto;
  }
  button {
    grid-column-start: span 1;
    grid-row-start: 1;
    margin-left: 2px;
    margin-right: 2px;

    height: 2rem;
    font-size: 10px;
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
