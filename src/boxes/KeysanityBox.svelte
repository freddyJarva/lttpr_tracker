<script>
  export let name;
  export let images = [];
  export let smallKeyMax = 0;
  export let smallKeyMin = 0;
  export let smallKeyGoMode = 0;

  let keyCount = 0
  let activeRewardIndex = 0;
  let bigKeyImage = 'images/bigkey.png'
  let isDone = false;
  let hasBigKey = false;
  let dungeonState;
  let keyColor;
  $: activeClass = isDone ? 'active' : 'inactive'
  $: if (keyCount < smallKeyGoMode) {
    keyColor = 'red'
    dungeonState = 'not clearable'
  } else if (keyCount < smallKeyMin) {
    keyColor = 'gold'
    dungeonState = 'Go Mode'
  } else if (keyCount < smallKeyMax && smallKeyMax - smallKeyMin) {
    keyColor = 'blue'
    dungeonState = 'can full clear'
  } else {
    keyColor = 'green'
    dungeonState = 'all keys found'
  }

  function toggleDone() {
    isDone = !isDone
  }

  function changeReward() {
    activeRewardIndex = (activeRewardIndex + 1) % images.length
  }

  function incrementKeys() {
    keyCount = (keyCount + 1) % (smallKeyMax + 1)
  }

  function toggleBigKey() {
    hasBigKey = !hasBigKey
  }

</script>

<div class='DungeonBox'>
  <span class='keysanity-fragment {`dungeon-name-${activeClass}`}'>{name}</span>
  {#if images[activeRewardIndex]}
    <img 
      on:click|preventDefault={toggleDone} 
      on:contextmenu|preventDefault={changeReward} 
      src={images[activeRewardIndex]} 
      alt={name} 
      class="keysanity-fragment {activeClass}"/>
  {:else}
    <span 
      on:click|preventDefault={toggleDone} 
      on:contextmenu|preventDefault={changeReward} 
      class='keysanity-fragment {activeClass} dungeon-reward'>?</span>
  {/if}
  <span 
    class='keysanity-fragment {keyColor}' 
    on:click|preventDefault={incrementKeys} 
    title={dungeonState}>
      {keyCount}
  </span>
  <img
    on:click={toggleBigKey}
    src={bigKeyImage} alt='Big Key' 
    class="keysanity-fragment big-key" 
    class:big-key-inactive={!hasBigKey}
    />
</div>

<style type="text/scss">
  $zelda-green: hsl(122,58,51);
  $zelda-blue: hsl(222,63,56);
  $zelda-red: hsl(0,100,29);
  $zelda-yellow: hsl(44,100,45);
  .DungeonBox {
      color: whitesmoke;
      justify-self: center;
      grid-row-end: span 1;
      grid-column: 11 / span 4;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      .green {
        color: $zelda-green;
      }

      .blue {
        color: $zelda-blue;
      }

      .red {
        color: $zelda-red;
      }

      .gold {
        color: $zelda-yellow;
      }

      .dungeon-reward {
        padding: 1px;
      }

      .dungeon-name-active {
        color: $zelda-green;
      }

      .keysanity-fragment {
        grid-row-end: span 1;
        grid-column-start: span 1;
        justify-self: center;
      }

      .big-key {
        margin-top: 2px;
        height: 26px;
        width: 22px;
        -webkit-transition: all .1s ease-out;
        -moz-transition: all .1s ease-out;
        -o-transition: all .1s ease-out;
        transition: all .1s ease-out;
      }

      .big-key-inactive {
        filter: grayscale(1);
        opacity: .3;
      }

      span {
          margin: 6px;
          margin-top: 8px;
      }
      img {
          width: 30px;
      }

      .inactive {
        filter: grayscale(0.4);
        opacity: 0.6;
      }

  }
</style>