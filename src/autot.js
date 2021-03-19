import { debug } from "svelte/internal";
import { hammerStore } from "./items";

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
  console.log("gamemode: ", gamemode);
  return [0x07, 0x09, 0x0b].includes(gamemode);
}

function updateIfChanged(data) {
  let hammer_offset = 0x34b;
  let hammer_mask = 0x01;
  hammerStore.set(data[hammer_offset] & hammer_mask);
}

//// Code taken from dunka's tracker for reference
// function autotrackDoTracking(data) {
//   function changed(offset) {
//     return (
//       autotrackPrevData === null || autotrackPrevData[offset] !== data[offset]
//     );
//   }
//   function disabledbit(offset, mask) {
//     return (
//       (data[offset] & mask) === 0 &&
//       (autotrackPrevData === null || (autotrackPrevData[offset] & mask) !== 0)
//     );
//   }
//   function newbit(offset, mask) {
//     return (
//       (data[offset] & mask) !== 0 &&
//       (autotrackPrevData === null ||
//         (autotrackPrevData[offset] & mask) !== (data[offset] & mask))
//     );
//   }

//   function setitem(item, value) {
//     while (items[item] != value) toggle(item);
//   }

//   if (changed(0x343))
//     // Bombs
//     setitem("bomb", data[0x343] > 0);

//   if (changed(0x3c5) && data[0x3c5] >= 3)
//     // Agahnim Killed
//     setitem("agahnim", true);

//   if (newbit(0x38e, 0x80)) setitem("bow", 1); // Bow
//   if (newbit(0x38e, 0x40)) setitem("bow", 2); // Silvers

//   if (newbit(0x38c, 0xc0)) {
//     var bits = data[0x38c] & 0xc0;
//     setitem("boomerang", bits == 0x80 ? 1 : bits == 0x40 ? 2 : 3);
//   }

//   if (disabledbit(0x38c, 0x20)) setitem("mushroom", false);
//   if (newbit(0x38c, 0x20)) setitem("mushroom", true);
//   if (newbit(0x38c, 0x10)) setitem("powder", true);

//   if (newbit(0x38c, 0x04)) setitem("shovel", true);
//   if (newbit(0x38c, 0x03)) setitem("flute", true);

//   if (newbit(0x342, 0x01)) setitem("hookshot", true);

//   if (newbit(0x345, 0x01)) setitem("firerod", true);

//   if (newbit(0x346, 0x01)) setitem("icerod", true);

//   if (newbit(0x347, 0x01)) setitem("bombos", true);

//   if (newbit(0x348, 0x01)) setitem("ether", true);

//   if (newbit(0x349, 0x01)) setitem("quake", true);

//   if (newbit(0x34a, 0x01)) setitem("lantern", true);

//   if (newbit(0x34b, 0x01)) setitem("hammer", true);

//   if (newbit(0x34d, 0x01)) setitem("net", true);

//   if (newbit(0x34e, 0x01)) setitem("book", true);

//   if (newbit(0x350, 0x01)) setitem("somaria", true);

//   if (newbit(0x351, 0x01)) setitem("byrna", true);

//   if (newbit(0x352, 0x01)) setitem("cape", true);

//   if (newbit(0x353, 0x02)) setitem("mirror", true);

//   if (newbit(0x355, 0x01)) setitem("boots", true);

//   if (newbit(0x356, 0x01)) setitem("flippers", true);

//   if (newbit(0x357, 0x01)) setitem("moonpearl", true);

//   if (changed(0x354)) setitem("glove", data[0x354]);

//   if (changed(0x359))
//     setitem(
//       "sword",
//       flags["swordmode"] === "S" || data[0x359] == 0xff ? 0 : data[0x359]
//     );

//   if (changed(0x35a)) setitem("shield", data[0x35a]);

//   if (changed(0x35b)) setitem("tunic", data[0x35b] + 1);

//   if (changed(0x37b)) setitem("magic", data[0x37b] > 0);

//   var prevbottles = -1;
//   if (autotrackPrevData !== null)
//     prevbottles =
//       (autotrackPrevData[0x35c] == 0 ? 0 : 1) +
//       (autotrackPrevData[0x35d] == 0 ? 0 : 1) +
//       (autotrackPrevData[0x35e] == 0 ? 0 : 1) +
//       (autotrackPrevData[0x35f] == 0 ? 0 : 1);
//   var bottles =
//     (data[0x35c] == 0 ? 0 : 1) +
//     (data[0x35d] == 0 ? 0 : 1) +
//     (data[0x35e] == 0 ? 0 : 1) +
//     (data[0x35f] == 0 ? 0 : 1);
//   if (bottles != prevbottles) setitem("bottle", bottles);

//   updateMapTracker();
// }
