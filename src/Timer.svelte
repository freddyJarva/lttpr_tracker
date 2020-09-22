<script>
  import { formatTime } from './utils'

  let startTime;
  let elapsedTime = 0;
  let interval;
  $: isRunning = interval ? true : false
  let isFinished = false

  function startTimer() {
    startTime = Date.now()
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime
    }, 100)
  }

  function stopTimer() {
    clearInterval(interval)
    interval = null
  }

  function reset() {
    clearInterval(interval)
    interval = null
    isFinished = false
    elapsedTime = 0
  }

  function finish() {
    isFinished = true
    stopTimer()
  }

</script>



<div class='Timer'>
  <div class={`time ${isFinished ? 'finished' : null}`}>
    {formatTime(elapsedTime)}
  </div>
  {#if !isRunning && !isFinished}
    <button on:click={startTimer}>START</button>
  {:else}
    <button on:click={reset}>RESET</button>
  {/if}
  <button class='button' on:click={finish} disabled={!isRunning}>FINISH</button>
</div>

<style type="text/scss">
  $green: rgb(0, 211, 0);
  
  .Timer {
    border-top: whitesmoke;

    grid-column: 1 / span 11;
    grid-row: 12 / span 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    // border-top: 1px solid rgb(36, 36, 36);
    border: goldenrod solid 3px;
    border-radius: 5px;
    // border-end-end-radius: 5%;

    button {
        margin: 4px;
        color: whitesmoke;
        background-color: black;
        border-color: gold;
        border-bottom: 1px solid goldenrod;
        border-right: 1px solid goldenrod;
        font-family: 'Press Start 2P';
        font-size: 12px;
    }

    button:focus {
        outline: none;
    }

    button:disabled {
        color: grey;
        border-color: grey;
    }

    .time {
        font-size: 38px;
        color: rgb(255, 255, 255);
        align-self: center;
        justify-self: center;
        padding: 10px;
        grid-column: span 2;
    }

    .time.finished {
        color: $green;
    }
  }
</style>