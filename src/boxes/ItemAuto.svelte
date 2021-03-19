<script>
  import { hammerStore, hammerItem } from "../items";
  let name = hammerItem.name;
  let images = hammerItem.images;
  let type = hammerItem.type;
  let currentIndex = 0;

  function handleClick() {
    currentIndex = (currentIndex + 1) % images.length;
  }
</script>

<div
  class={type === "item" ? "ItemBox" : "DoubleItemBox"}
  class:inactive={$hammerStore === 0}
  alt={name}
  on:click={handleClick}
  on:contextmenu|preventDefault
>
  <img src={images[$hammerStore]} alt={name} />
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
