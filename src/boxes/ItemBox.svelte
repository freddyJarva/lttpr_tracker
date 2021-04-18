<script>
  import { onMount } from "svelte";

  export let name;
  export let images;
  export let type;
  export let autotrackState = null;
  let manualState = null;
  let currentIndex = 0;

  // Allow the user to manually override value coming from autotracker.
  $: if (manualState !== null) {
    currentIndex = manualState;
  } else {
    currentIndex = $autotrackState;
  }

  function handleClick() {
    manualState = (currentIndex + 1) % images.length;
  }

  onMount(() => {
    if (autotrackState === null) {
      manualState = 0;
    }
  });
</script>

<div
  class={type === "item" ? "ItemBox" : "DoubleItemBox"}
  class:inactive={currentIndex === 0}
  alt={name}
  on:click={handleClick}
  on:contextmenu|preventDefault
>
  <img src={images[currentIndex]} alt={name} />
</div>

<style type="text/scss">
  .ItemBox {
    color: whitesmoke;
    justify-self: center;
    grid-row-end: span 2;
    grid-column-start: span 2;
  }

  .DoubleItemBox {
    color: whitesmoke;
    align-self: center;
    grid-row-end: span 2;
    grid-column-start: span 1;

    img {
      width: 34px;
    }
  }
</style>
