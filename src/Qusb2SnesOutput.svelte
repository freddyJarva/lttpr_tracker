<script>
  import { onMount } from "svelte";
  import { setsocket, autotrackStartTimer } from "./autot";

  let webSocket;
  let snes_devices = [];
  let selected_device;

  $: console.log("Selected device:", selected_device);

  const TRACKING_PORT = "8080";

  let host = "ws://localhost:" + TRACKING_PORT;

  onMount(async () => {
    webSocket = new WebSocket(host);
    webSocket.onopen = function (event) {
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

      webSocket.onmessage = function (event) {
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
    {/if}
  </select>
</div>

<style lang="scss">
  @import "src/theme.scss";

  .Qusb2Snes {
    border-top: whitesmoke;

    display: flex;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    border: $zelda-yellow solid 3px;
    border-radius: 5px;
    width: fit-content;
    padding: 8px;

    button {
      margin: 4px;
      padding: 8px;
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
  }
</style>
