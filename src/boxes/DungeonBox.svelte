<script>
  let finished = false;
  export let name;
  export let images = [];
  let activeRewardIndex = 0;
  let isDone = false;
  
  console.log(activeRewardIndex)

  function toggleDone() {
    isDone = !isDone
  }

  function changeReward() {
    activeRewardIndex = (activeRewardIndex + 1) % images.length
  }
</script>

<box on:click|preventDefault={toggleDone} on:contextmenu|preventDefault={changeReward} class='DungeonBox'>
  <label>{name}</label>
  <img src={images[activeRewardIndex]} alt={name} class="{isDone ? 'active' : 'inactive'}"/>
</box>

<style type="text/scss">
  .DungeonBox {
      color: whitesmoke;
      justify-self: center;
      grid-row-end: span 2;
      grid-column-start: span 2;
      width: 100%;

      label {
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