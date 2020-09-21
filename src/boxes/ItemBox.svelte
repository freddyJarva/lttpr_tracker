<script>
  export let name;
  export let images;
  export let type;
  let currentIndex = 0;

  function handleClick() {
    currentIndex = (currentIndex + 1) % images.length
  }
</script>


<!-- <img class="{type === 'item' ? 'ItemBox' : 'DoubleItemBox'} {currentIndex > 0 ? 'null' : 'inactive'}" src={images[currentIndex]} alt={name} on:click={handleClick}/> -->
<div 
  class="{type === 'item' ? 'ItemBox' : 'DoubleItemBox'}" 
  class:inactive={currentIndex === 0} alt={name} on:click={handleClick}>
  <img src={images[currentIndex]} alt={name}/>
</div>


<style type="text/scss">
.ItemBox {
    color: whitesmoke;
    /* outline: rgb(40, 38, 53) solid 1px; */
    justify-self: center;
    grid-row-end: span 2;
    grid-column-start: span 2;
}

.DoubleItemBox {
    color: whitesmoke;
    /* outline: rgb(40, 38, 53) solid 1px; */
    align-self: center;
    grid-row-end: span 2;
    grid-column-start: span 1;

    img {
      width: 34px;
    }
}
</style>
