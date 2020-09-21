<script>
  export let images;
  export let name;
  export let entryTo;
  let isDone = false;
  let activeEntryIndex = 0


  function toggleDone() {
    isDone = !isDone
  }

  function changeEntryTo() {
    activeEntryIndex = (activeEntryIndex + 1) % entryTo.length
  }
</script>
  

<box on:click|preventDefault={toggleDone} on:contextmenu|preventDefault={changeEntryTo} class='MedallionBox'>
  <div>{#if activeEntryIndex > 0}<span>{entryTo[activeEntryIndex]}</span>{/if}</div>
  <img src={images[0]} alt={name} class="{isDone ? 'active' : 'inactive'}"/>
</box>


<style type="text/scss">
.MedallionBox {
    color: whitesmoke;
    justify-self: center;
    grid-row-end: span 2;
    grid-column-start: span 2;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    div {
        margin-top: 8px;
        margin-left: 2px;
        margin-bottom: -100px;
        grid-column-end: span 3;
        grid-row-end: span 1;
        z-index: 1;

        span {
            padding-top: 2px;
            padding-left: 2px;
            background-color: hsl(40, 100%, 0%);
        }
    }
    img {
        width: 100%;
        grid-column: first / span 3;
        grid-row: first / span 3;
    }
}
</style>