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
</script>

{#if $img !== "" && $text === ""}
  <div
    class="card-compact"
    on:mouseover={onMouseHover}
    on:mouseout={onMouseLeave}
  >
    <img src={$img} alt={$img} />
  </div>
{:else if $text !== ""}
  <div class="card" on:mouseover={onMouseHover} on:mouseout={onMouseLeave}>
    {#if $img !== ""}
      <img src={$img} alt={$img} />
    {/if}
    <div class="text-content">
      <h3>{entranceName}</h3>

      <p contenteditable="true">{$text}</p>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "src/theme.scss";
  .card {
    background: #282828;
    font-size: 14px;

    padding: 4px;
    margin-bottom: 8px;

    grid-row: span 2;
    grid-column: span 2;
    display: grid;
    grid-template-columns: 20% 80%;

    justify-items: center;
    border-radius: 2%;
  }

  .card-compact {
    background: #282828;
    font-size: 14px;
    padding: 4px;
    margin-bottom: 8px;

    grid-row: span 2;
    grid-column: span 1;

    justify-items: center;

    display: grid;
    grid-template-columns: 100%;

    border-radius: 2%;
  }

  h3 {
    color: $zelda-yellow;
    text-decoration: underline;
    font-size: 14px;
  }

  img {
    grid-column-start: 1;
    min-width: 24px;
    max-height: 36px;
    padding-right: 4px;
  }
  .text-content {
    grid-column-start: 2;
  }
</style>
