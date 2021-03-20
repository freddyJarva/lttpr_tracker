import { debug } from "svelte/internal";
import items from "./items";

let autotrackHost = null;
let autotrackSocket = null;
let autotrackDeviceName = "";

let autotrackReconnectTimer = null;
let autotrackTimer = null;

let autotrackPrevData = null;

let autotrackRefreshInterval = 1000;
let autotrackTimeoutDelay = 10000;

let WRAM_START = 0xf50000;
let WRAM_SIZE = 0x20000;
let SAVEDATA_START = WRAM_START + 0xf000;
let SAVEDATA_SIZE = 0x500;

export function setsocket(socket) {
  console.log("socket:", socket);
  autotrackSocket = socket;
  autotrackSocket.binaryType = "arraybuffer";
}

export function autotrackStartTimer() {
  autotrackTimer = setTimeout(autotrackReadMem, autotrackRefreshInterval);
}

function autotrackReadMem() {
  function snesread(address, size, callback) {
    autotrackSocket.send(
      JSON.stringify({
        Opcode: "GetAddress",
        Space: "SNES",
        Operands: [address.toString(16), size.toString(16)],
      })
    );
    autotrackSocket.onmessage = callback;
  }

  snesread(WRAM_START + 0x10, 1, function (event) {
    if (isInGame(event)) {
      snesread(SAVEDATA_START, 0x280, function (event2) {
        snesread(SAVEDATA_START + 0x280, 0x280, function (event3) {
          var data = new Uint8Array([
            ...new Uint8Array(event2.data),
            ...new Uint8Array(event3.data),
          ]);
          updateIfChanged(data);
          autotrackPrevData = data;
        });
      });
    }
    // Basically makes this a while loop that sleeps for a set amount
    autotrackStartTimer();
  });
}

function isInGame(event) {
  // I'm assuming gamemode here might mean start screen, in-game etc
  // I guess the values of interest can only be accessed in certain modes. maybe??
  let gamemode = new Uint8Array(event.data)[0];
  return [0x07, 0x09, 0x0b].includes(gamemode);
}

function updateIfChanged(data) {
  items
    .filter((item) => item.hasOwnProperty("autotrackState"))
    .forEach((item) => {
      item.autotrackState.updateFromQUsbData(data);
    });
}
