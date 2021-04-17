<script lang="ts">
  import type { Readable, Writable } from "svelte/store";

  export let entranceName = "Unknown";
  export let entranceId: string;
  export let text: Writable<string>;
  export let img: Writable<string>;
  export let interiorId: Readable<number>;

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

{#if $img !== "" && $interiorId !== -1}
  <div
    class="card"
    style="grid-area: {$interiorId};"
    on:mouseover={onMouseHover}
    on:mouseout={onMouseLeave}
    on:contextmenu|preventDefault={handleRightClick}
  >
    <img src={$img} alt={entranceName} />
  </div>
{/if}

<style lang="scss">
  @import "src/theme.scss";

  img {
    max-height: $dungeon-cell-height;
  }
</style>
