<script lang="ts">
  import type { Writable } from "svelte/store";
  import { selectTextOnFocus, blurOnEscape } from "./inputDirectives";

  export let entranceName = "Unknown";
  export let entranceId: string;
  export let text: Writable<string>;
  export let img: Writable<string>;

  let editing = false;

  function onMouseHover() {
    if (entranceId) {
      let el = document.getElementById(entranceId);
      el.classList.add("note-hover");
    }
  }

  function onMouseLeave() {
    if (entranceId) {
      let el = document.getElementById(entranceId);
      el.classList.remove("note-hover");
    }
  }

  function handleRightClick() {
    $text = "";
    onMouseLeave();
  }

  function setFocus(node: HTMLInputElement) {
    setTimeout(() => {
      node.focus();
    }, 50);
  }
</script>

{#if $text !== ""}
  <div
    class="card"
    on:mouseover={onMouseHover}
    on:mouseout={onMouseLeave}
    on:contextmenu|preventDefault={handleRightClick}
    on:click={() => (editing = true)}
  >
    {#if entranceName}
      <p class="entrance-name-text">{entranceName}</p>
    {/if}
    {#if editing}
      <input
        class="note-input"
        bind:value={$text}
        use:selectTextOnFocus
        use:blurOnEscape
        use:setFocus
        on:keydown={(e) => (editing = e.key === "Enter" ? false : editing)}
        on:blur={() => (editing = false)}
      />
    {:else}
      <p>
        {$text}
      </p>
    {/if}
  </div>
{/if}

<style lang="scss">
  @import "src/theme.scss";
  .card {
    max-width: 120px;
    background: #282828;
    font-size: 14px;

    text-align: center;

    border: 1px solid $zelda-blue;
    padding: 0 8px 0 10px;
    margin-bottom: 8px;

    border-radius: 6%;
  }

  .note-input {
    max-width: 100px;
    min-height: 32px;
    font-size: 14px;

    text-align: center;
    border: none;
    font-size: 14px;
    font-family: "Press Start 2P";
  }

  .note-input:focus {
    outline: none;
  }

  .entrance-name-text {
    font-size: 7px;
    color: $zelda-yellow;
  }
</style>
