<script>
  import { bigKeyImage } from "../items";
  export let name;
  export let images = [];
  export let smallKeyMax = 0;
  export let smallKeyMin = 0;
  export let smallKeyGoMode = 0;
  export let bigKey = false;
  export let itemCount = 0;
  let currentItems = itemCount;

  let keyCount = 0;
  let hasBigKey = false;
  export let autotrackState = null;
  $: keyCount = $autotrackState.smallKeys;
  $: hasBigKey = $autotrackState.bigKey;

  let activeRewardIndex = 0;
  let isDone = false;

  let dungeonState;
  let keyColor;
  $: activeClass = isDone ? "active" : "inactive";

  $: if (keyCount < smallKeyGoMode) {
    keyColor = "red";
    dungeonState = "not clearable";
  } else if (keyCount < smallKeyMin) {
    keyColor = "gold";
    dungeonState = "Go Mode";
  } else if (keyCount < smallKeyMax && smallKeyMax - smallKeyMin) {
    keyColor = "blue";
    dungeonState = "full clear w. optimal key usage and items";
  } else {
    keyColor = "green";
    dungeonState = "all keys found";
  }

  function toggleDone() {
    isDone = !isDone;
  }

  function changeReward() {
    activeRewardIndex = (activeRewardIndex + 1) % images.length;
  }

  function incrementKeys() {
    /* Autotracker and manual tracking writes to the same place.
     Since autotracking for small keys work differently than other items
     and is prone to getting out of sync with the **true** amount of found keys,
     it made more sense to let manual tracking work in tandem with it.
    */
    $autotrackState.smallKeys =
      $autotrackState.smallKeys + 1 > smallKeyMax
        ? 0
        : $autotrackState.smallKeys + 1;
  }

  function toggleBigKey() {
    autotrackState.toggleManualBigKey();
  }

  function decrementItems() {
    currentItems = currentItems - 1 < 0 ? itemCount : currentItems - 1;
  }
</script>

<div class="DungeonBox" on:contextmenu|preventDefault={changeReward}>
  <span class="keysanity-fragment {`dungeon-name-${activeClass}`}">{name}</span>
  {#if images[activeRewardIndex]}
    <img
      on:click|preventDefault={toggleDone}
      src={images[activeRewardIndex]}
      alt={name}
      class="keysanity-fragment {activeClass}"
    />
  {:else}
    <span
      on:click|preventDefault={toggleDone}
      class="keysanity-fragment {activeClass} dungeon-reward"
      ><strong>?</strong></span
    >
  {/if}
  <span
    class="keysanity-fragment {keyColor} key-count counter"
    on:click|preventDefault={incrementKeys}
    title={dungeonState}
  >
    {keyCount}
  </span>
  {#if bigKey}
    <img
      on:click={toggleBigKey}
      src={bigKeyImage}
      alt="Big Key"
      class="keysanity-fragment big-key"
      class:big-key-inactive={!hasBigKey}
    />
  {/if}
  <span
    class="keysanity-fragment item-count counter"
    on:click|preventDefault={decrementItems}>{currentItems}</span
  >
</div>

<style lang="scss">
  @import "src/theme.scss";

  .DungeonBox {
    color: whitesmoke;
    justify-self: center;
    grid-row-end: span 1;
    grid-column: 11 / span 4;
    width: 110%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: "dungeon reward keys bigkey item-count";
    font-family: Zelda;
    font-size: 22px;

    .green {
      color: $zelda-green;
      @include transition-mixin(color);
    }

    .blue {
      color: $zelda-blue;
      @include transition-mixin(color);
    }

    .red {
      color: $zelda-red;
      @include transition-mixin(color);
    }

    .gold {
      color: $zelda-yellow;
      @include transition-mixin(color);
    }

    .dungeon-reward {
      margin-left: 6px;
    }

    .dungeon-name-active {
      color: $zelda-green;
    }

    .keysanity-fragment {
      grid-row-end: span 1;
      grid-column-start: span 1;
      justify-self: center;
    }

    .counter {
      font-size: 30px;
      margin-top: 0px;
    }

    .big-key {
      width: 90%;
      @include transition-mixin(all, 0.1s, ease-out);
      margin-right: 4px;
      margin-top: -2px;
    }

    .big-key-inactive {
      filter: grayscale(1);
      opacity: 0.3;
    }

    .item-count {
      grid-area: item-count;
      display: block;
      width: 24px;
      align-content: flex-start;
      text-align: right;
    }

    span {
      margin: 4px;
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
