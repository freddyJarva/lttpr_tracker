<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function connect() {
    dispatch("connect");
  }
</script>

<div>
  <button on:click={connect}>Connect</button>
</div>

<style>
  button {
    width: fit-content;
    height: 2rem;
  }
</style>
