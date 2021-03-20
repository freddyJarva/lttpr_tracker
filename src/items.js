import { writable } from "svelte/store";

const bow = "images/bow.png";
const silvers = "images/silvers.png";
const blumerang = "images/boomerang0.png";
const boomerang = "images/boomerang2.png";
const hookshot = "images/hookshot.png";
const bombs = "images/bomb0.png";
const powder = "images/powder.png";
const shroom = "images/mushroom.png";
const greenPendant = "images/dungeon1.png";
const pendant = "images/dungeon2.png";
const crystal = "images/dungeon3.png";
const redCrystal = "images/dungeon4.png";
const aganim = "images/agahnim0.png";
const frod = "images/firerod.png";
const irod = "images/icerod.png";
const bombos = "images/bombos.png";
const ether = "images/ether.png";
const quake = "images/quake.png";
const lantern = "images/lantern.png";
const hammer = "images/hammer.png";
const flute = "images/flute.png";
const shovel = "images/shovel.png";
const net = "images/net.png";
const book = "images/book.png";
const bottle = "images/bottle0.png";
const bottle1 = "images/bottle1.png";
const bottle2 = "images/bottle2.png";
const bottle3 = "images/bottle3.png";
const bottle4 = "images/bottle4.png";
const somaria = "images/somaria.png";
const byrna = "images/byrna.png";
const cape = "images/cape.png";
const mirror = "images/mirror.png";
const boots = "images/boots.png";
const glove1 = "images/glove0.png";
const glove2 = "images/glove2.png";
const flippers = "images/flippers.png";
const orb = "images/moonpearl.png";
const sword1 = "images/sword0.png";
const sword2 = "images/sword2.png";
const sword3 = "images/sword3.png";
const sword4 = "images/sword4.png";
const shield1 = "images/shield0.png";
const shield2 = "images/shield2.png";
const shield3 = "images/shield3.png";
const uncle = "images/uncle.png";

function hasFoundItem(dataAtOffset, hexMask) {
  return (dataAtOffset & hexMask) !== 0;
}

function maskToOrdered(dataAtOffset, hexMasks) {
  for (let i = 0; i < hexMasks.length; i++) {
    if ((dataAtOffset & hexMasks[i]) !== 0) {
      return i + 1;
    }
  }
  return 0;
}

function createBinaryItem(hexOffset, hexMask) {
  const { subscribe, set } = writable(0);

  return {
    subscribe,
    updateFromQUsbData: (qusbData) => {
      set(hasFoundItem(qusbData[hexOffset], hexMask) ? 1 : 0);
    },
    reset: () => set(0),
  };
}

const binaryItemMask = 0x01;

/* double items are all distinct items sharing the same slot, i.e.
flute/shovel, blumerang/boomered and powder/shroom.
They're found at the same byte, but on different bits:

  0b  1 1 1 1 1 1 1 1
      ^ ^ ^ ^ ? ^ ^ ^
      │ │ │ │   │ └─└── flute
      │ │ │ │   └── shovel
      │ │ │ └── powder
      │ │ └── shroom
      │ └── blumerang
      └── boomered

We use the same offset but different masks,
to check the state of every double item with a bitwise AND operation
*/
const doubleItemOffset = 0x38c;

function createProgressiveItem(hexOffset) {
  const { subscribe, set } = writable(0);

  return {
    subscribe,
    updateFromQUsbData: (qusbData) => {
      set(qusbData[hexOffset]);
    },
    reset: () => set(0),
  };
}

function createBow(hexOffset) {
  const { subscribe, set } = writable(0);
  const bowMask = 0x80;
  const silverMask = 0x40;

  return {
    subscribe,
    updateFromQUsbData: (qusbData) => {
      // Make this less shitty
      set(maskToOrdered(qusbData[hexOffset], [bowMask, silverMask]));
    },
    reset: () => set(0),
  };
}

function createBottles(hexOffsets) {
  const { subscribe, set } = writable(0);
  return {
    subscribe,
    updateFromQUsbData: (qusbData) => {
      let bottleTotal = hexOffsets.reduce((tally, offset) => {
        let bottleAtOffset = qusbData[offset] === 0 ? 0 : 1;
        return tally + bottleAtOffset;
      }, 0);
      set(bottleTotal);
    },
    reset: () => set(0),
  };
}

const items = [
  {
    name: "bow",
    type: "item",
    images: [bow, bow, silvers],
    autotrackState: createBow(0x38e),
  },
  {
    name: "blue",
    type: "doubleItem",
    images: [blumerang, blumerang],
    autotrackState: createBinaryItem(doubleItemOffset, 0x80),
  },
  {
    name: "boomerang",
    type: "doubleItem",
    images: [boomerang, boomerang],
    autotrackState: createBinaryItem(doubleItemOffset, 0x40),
  },
  {
    name: "hookshot",
    type: "item",
    images: [hookshot, hookshot],
    autotrackState: createBinaryItem(0x342, binaryItemMask),
  },
  { name: "bombs", type: "item", images: [bombs, bombs] },
  {
    name: "powder",
    type: "doubleItem",
    images: [powder, powder],
    autotrackState: createBinaryItem(doubleItemOffset, 0x10),
  },
  {
    name: "shroom",
    type: "doubleItem",
    images: [shroom, shroom],
    autotrackState: createBinaryItem(doubleItemOffset, 0x20),
  },

  {
    name: "frod",
    type: "item",
    images: [frod, frod],
    autotrackState: createBinaryItem(0x345, binaryItemMask),
  },
  {
    name: "irod",
    type: "item",
    images: [irod, irod],
    autotrackState: createBinaryItem(0x346, binaryItemMask),
  },
  {
    name: "bombos",
    type: "medallion",
    entryTo: ["", "MM", "TR", "BOTH"],
    images: [bombos, bombos],
    autotrackState: createBinaryItem(0x347, binaryItemMask),
  },
  {
    name: "ether",
    type: "medallion",
    entryTo: ["", "MM", "TR", "BOTH"],
    images: [ether, ether],
    autotrackState: createBinaryItem(0x348, binaryItemMask),
  },
  {
    name: "quake",
    type: "medallion",
    entryTo: ["", "MM", "TR", "BOTH"],
    images: [quake, quake],
    autotrackState: createBinaryItem(0x349, binaryItemMask),
  },

  {
    name: "lantern",
    type: "item",
    images: [lantern, lantern],
    autotrackState: createBinaryItem(0x34a, binaryItemMask),
  },
  {
    name: "hammer",
    type: "item",
    images: [hammer, hammer],
    autotrackState: createBinaryItem(0x34b, binaryItemMask),
  },
  {
    name: "flute",
    type: "doubleItem",
    images: [flute, flute],
    autotrackState: createBinaryItem(doubleItemOffset, 0x03),
  },
  {
    name: "shovel",
    type: "doubleItem",
    images: [shovel, shovel],
    autotrackState: createBinaryItem(doubleItemOffset, 0x04),
  },
  {
    name: "net",
    type: "item",
    images: [net, net],
    autotrackState: createBinaryItem(0x34d, binaryItemMask),
  },
  {
    name: "book",
    type: "item",
    images: [book, book],
    autotrackState: createBinaryItem(0x34e, binaryItemMask),
  },

  {
    name: "bottle",
    type: "item",
    images: [bottle, bottle1, bottle2, bottle3, bottle4],
    autotrackState: createBottles([0x35c, 0x35d, 0x35e, 0x35f]),
  },
  {
    name: "somaria",
    type: "item",
    images: [somaria, somaria],
    autotrackState: createBinaryItem(0x350, binaryItemMask),
  },
  {
    name: "byrna",
    type: "item",
    images: [byrna, byrna],
    autotrackState: createBinaryItem(0x351, binaryItemMask),
  },
  {
    name: "cape",
    type: "item",
    images: [cape, cape],
    autotrackState: createBinaryItem(0x352, binaryItemMask),
  },
  {
    name: "mirror",
    type: "item",
    images: [mirror, mirror],
    autotrackState: createBinaryItem(0x353, 0x02),
  },

  {
    name: "boots",
    type: "item",
    images: [boots, boots],
    autotrackState: createBinaryItem(0x355, binaryItemMask),
  },
  {
    name: "glove",
    type: "item",
    images: [glove1, glove1, glove2],
    autotrackState: createProgressiveItem(0x354),
  },
  {
    name: "flippers",
    type: "item",
    images: [flippers, flippers],
    autotrackState: createBinaryItem(0x356, binaryItemMask),
  },
  {
    name: "orb",
    type: "item",
    images: [orb, orb],
    autotrackState: createBinaryItem(0x357, binaryItemMask),
  },
  {
    name: "sword",
    type: "doubleItem",
    images: [sword1, sword1, sword2, sword3, sword4],
    autotrackState: createProgressiveItem(0x359),
  },
  {
    name: "shield",
    type: "doubleItem",
    images: [shield1, shield1, shield2, shield3],
    autotrackState: createProgressiveItem(0x35a),
  },

  {
    name: "HC",
    type: "dungeon",
    images: [uncle],
    smallKeyMax: 1,
    smallKeyMin: 1,
    bigKey: false,
  },
  {
    name: "EP",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 0,
    smallKeyMin: 0,
    smallKeyGoMode: 0,
    bigKey: true,
  },
  {
    name: "DP",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 1,
    smallKeyMin: 1,
    smallKeyGoMode: 0,
    bigKey: true,
  },
  {
    name: "TH",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 1,
    smallKeyMin: 1,
    smallKeyGoMode: 0,
    bigKey: true,
  },
  {
    name: "AT",
    type: "dungeon",
    images: [aganim, aganim],
    smallKeyMax: 2,
    smallKeyMin: 2,
    smallKeyGoMode: 2,
    bigKey: false,
  },
  {
    name: "PD",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 6,
    smallKeyMin: 4,
    smallKeyGoMode: 1,
    bigKey: true,
  },
  {
    name: "SP",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 1,
    smallKeyMin: 1,
    smallKeyGoMode: 1,
    bigKey: true,
  },
  {
    name: "SW",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 3,
    smallKeyMin: 0,
    smallKeyGoMode: 0,
    bigKey: true,
  },
  {
    name: "TT",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 1,
    smallKeyMin: 1,
    smallKeyGoMode: 0,
    bigKey: true,
  },
  {
    name: "IP",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 2,
    smallKeyMin: 0,
    smallKeyGoMode: 0,
    bigKey: true,
  },
  {
    name: "MM",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 3,
    smallKeyMin: 0,
    smallKeyGoMode: 0,
    bigKey: true,
  },
  {
    name: "TR",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 4,
    smallKeyMin: 4,
    smallKeyGoMode: 3,
    bigKey: true,
  },
  {
    name: "GT",
    type: "dungeon",
    images: [aganim, aganim],
    smallKeyMax: 4,
    smallKeyMin: 4,
    smallKeyGoMode: 1,
    bigKey: true,
  },
];

export default items;
