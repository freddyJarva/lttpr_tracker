<script lang="ts">
  import type { Writable } from "svelte/store";

  export let entranceName = "Unknown";
  export let entranceId: string;
  export let text: Writable<string>;
  export let img: Writable<string>;

  function onMouseHover() {
    let el = document.getElementById(entranceId);
    el.classList.add("note-hover");
  }

  function onMouseLeave() {
    let el = document.getElementById(entranceId);
    el.classList.remove("note-hover");
  }

  function handleRightClick() {
    $text = "";
    onMouseLeave();
  }
</script>

{#if $text !== ""}
  <div
    class="card"
    on:mouseover={onMouseHover}
    on:mouseout={onMouseLeave}
    on:contextmenu|preventDefault={handleRightClick}
  >
    <!-- <p class="entrance-name-text">{entranceName}</p> -->
    <p contenteditable="true" bind:textContent={$text} />
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

  .entrance-name-text {
    font-size: 7px;
    color: $zelda-yellow;
  }
</style>
