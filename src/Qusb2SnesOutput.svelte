<script>
  import { onMount } from "svelte";
  import { setsocket, autotrackStartTimer } from "./autot";
  import ItemAuto from "./boxes/ItemAuto.svelte";

  let messages = [];

  let autotrackTimer;

  let autotrackRefreshInterval = 1000;
  let autotrackTimeoutDelay = 10000;

  let webSocket;
  let snes_devices = [];
  let selected_device;

  const WRAM_START = 0xf50000;
  const WRAM_SIZE = 0x20000;
  const SAVEDATA_START = WRAM_START + 0xf000;
  const SAVEDATA_SIZE = 0x500;

  $: console.log("Selected device:", selected_device);

  const TRACKING_PORT = "8080";

  let host = "ws://localhost:" + TRACKING_PORT;

  onMount(async () => {
    webSocket = new WebSocket(host);
    webSocket.onopen = function (event) {
      console.log("SHIT IS HAPPENING");
      webSocket.send(
        JSON.stringify({
          Opcode: "DeviceList",
          Space: "SNES",
        })
      );
    };

    webSocket.onmessage = function (event) {
      let results = JSON.parse(event.data);
      snes_devices = results.Results;
      console.log(results);

      webSocket.onmessage = function (event) {
        console.log("HURRAY");
        console.log(event.data);
      };
    };
  });

  function attachToDevice() {
    let message = JSON.stringify({
      Opcode: "Attach",
      Space: "SNES",
      Operands: [selected_device],
    });
    console.log("message to send: ", message);
    webSocket.send(message);

    message = JSON.stringify({
      Opcode: "Info",
      Space: "SNES",
      Operands: [selected_device],
    });
    webSocket.send(message);

    setsocket(webSocket);
    autotrackStartTimer();
  }
</script>

<div class="Qusb2Snes">
  <button disabled={!selected_device} on:click={attachToDevice}>
    CONNECT
  </button>
  <select bind:value={selected_device}>
    <option value="None">None</option>
    {#if snes_devices}
      {#each snes_devices as device}
        <option value={device}>
          {device}
        </option>
      {/each}
    {:else}{/if}
  </select>
  <ItemAuto />
</div>

<style lang="scss">
  @import "src/theme.scss";

  .Qusb2Snes {
    border-top: whitesmoke;

    grid-column: 1 / span 11;
    grid-row: 19 / span 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    border: $zelda-yellow solid 3px;
    border-radius: 5px;

    button {
      margin: 4px;
      color: whitesmoke;
      background-color: black;
      border-color: $zelda-yellow;
      border-bottom: 1px solid hsl(43, 74%, 49%);
      border-right: 1px solid goldenrod;
      font-family: "Press Start 2P";
      font-size: 12px;
      margin: -4px 8px 10px 10px;
    }

    button:focus {
      outline: none;
    }

    button:disabled {
      color: grey;
      border-color: grey;
    }

    button:focus {
      outline: none;
    }

    button:disabled {
      color: grey;
      border-color: grey;
    }

    li {
      font-size: 12px;
      color: rgb(255, 255, 255);
      align-self: center;
      justify-self: center;
      padding: 10px;
      grid-column: span 2;
    }
  }
</style>
