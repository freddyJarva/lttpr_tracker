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

{#if $text !== "" || $img !== ""}
  <div class="card" on:mouseover={onMouseHover} on:mouseout={onMouseLeave}>
    <img src={$img} alt={$img} />
    <div class="text-content">
      <span>{entranceName}</span>
      <hr />
      <span contenteditable="true">{$text}</span>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "src/theme.scss";
  .card {
    background: #282828;
    font-size: 14px;

    padding: 4px;
    margin-left: 16px;
    margin-bottom: 8px;

    display: grid;
    grid-template-columns: 20% 80%;

    border-radius: 2%;
  }

  img {
    grid-column-start: 1;
    min-width: 32px;
    max-height: 64px;
  }
  .text-content {
    grid-column-start: 2;
  }
  hr {
    border: 1px solid grey;
  }
</style>
