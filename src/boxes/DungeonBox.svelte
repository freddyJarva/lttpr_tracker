<script>
  export let name;
  export let images = [];
  let activeRewardIndex = 0;
  let isDone = false;

  function toggleDone() {
    isDone = !isDone;
  }

  function changeReward() {
    activeRewardIndex = (activeRewardIndex + 1) % images.length;
  }
</script>

<box
  on:click|preventDefault={toggleDone}
  on:contextmenu|preventDefault={changeReward}
  class="DungeonBox"
>
  <span>{name}</span>
  <img src={images[activeRewardIndex]} alt={name} class:inactive={!isDone} />
</box>

<style type="text/scss">
  .DungeonBox {
    color: whitesmoke;
    justify-self: center;
    grid-row-end: span 2;
    grid-column-start: span 2;
    width: 100%;

    span {
      margin: 3px;
    }
    img {
      width: 50%;
      margin-left: 20px;
    }

    .inactive {
      filter: grayscale(0.4);
      opacity: 0.4;
    }
  }
</style>
