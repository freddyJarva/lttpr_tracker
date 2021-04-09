<script lang="ts">
  import type { Writable } from "svelte/store";

  export let entrance = "Unknown";
  export let text: Writable<string>;
  export let iconImg: Writable<string>;

  $: console.log("icon img:", $iconImg);

  $: src = $iconImg !== "" ? $iconImg : "";

  // const mockImg = "icons/map-marker-zelda-m.webp";
</script>

{#if $text !== "" || src !== ""}
  <div class="card">
    <img {src} alt={src} />
    <div class="text-content">
      <span>{entrance}</span>
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
    // border: 1px solid red;

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
