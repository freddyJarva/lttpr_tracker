import { writable } from "svelte/store";

const ITEM_ASSET_FOLDER = "images/item-tracker";

export const bigKeyImage = ITEM_ASSET_FOLDER + "/big-key.webp";

const bow = ITEM_ASSET_FOLDER + "/bow.webp";
const silvers = ITEM_ASSET_FOLDER + "/silvers.webp";
const blumerang = ITEM_ASSET_FOLDER + "/boomerang0.webp";
const boomerang = ITEM_ASSET_FOLDER + "/boomerang2.webp";
const hookshot = ITEM_ASSET_FOLDER + "/hookshot.webp";
const bombs = ITEM_ASSET_FOLDER + "/bomb0.webp";
const powder = ITEM_ASSET_FOLDER + "/powder.webp";
const shroom = ITEM_ASSET_FOLDER + "/mushroom.webp";
const greenPendant = ITEM_ASSET_FOLDER + "/dungeon1.webp";
const pendant = ITEM_ASSET_FOLDER + "/dungeon2.webp";
const crystal = ITEM_ASSET_FOLDER + "/dungeon3.webp";
const redCrystal = ITEM_ASSET_FOLDER + "/dungeon4.webp";
const aganim = ITEM_ASSET_FOLDER + "/agahnim0.webp";
const frod = ITEM_ASSET_FOLDER + "/firerod.webp";
const irod = ITEM_ASSET_FOLDER + "/icerod.webp";
const bombos = ITEM_ASSET_FOLDER + "/bombos.webp";
const ether = ITEM_ASSET_FOLDER + "/ether.webp";
const quake = ITEM_ASSET_FOLDER + "/quake.webp";
const lantern = ITEM_ASSET_FOLDER + "/lantern.webp";
const hammer = ITEM_ASSET_FOLDER + "/hammer.webp";
const flute = ITEM_ASSET_FOLDER + "/flute.webp";
const shovel = ITEM_ASSET_FOLDER + "/shovel.webp";
const net = ITEM_ASSET_FOLDER + "/net.webp";
const book = ITEM_ASSET_FOLDER + "/book.webp";
const bottle = ITEM_ASSET_FOLDER + "/bottle0.webp";
const bottle1 = ITEM_ASSET_FOLDER + "/bottle1.webp";
const bottle2 = ITEM_ASSET_FOLDER + "/bottle2.webp";
const bottle3 = ITEM_ASSET_FOLDER + "/bottle3.webp";
const bottle4 = ITEM_ASSET_FOLDER + "/bottle4.webp";
const somaria = ITEM_ASSET_FOLDER + "/somaria.webp";
const byrna = ITEM_ASSET_FOLDER + "/byrna.webp";
const cape = ITEM_ASSET_FOLDER + "/cape.webp";
const mirror = ITEM_ASSET_FOLDER + "/mirror.webp";
const boots = ITEM_ASSET_FOLDER + "/boots.webp";
const glove1 = ITEM_ASSET_FOLDER + "/glove0.webp";
const glove2 = ITEM_ASSET_FOLDER + "/glove2.webp";
const flippers = ITEM_ASSET_FOLDER + "/flippers.webp";
const orb = ITEM_ASSET_FOLDER + "/moonpearl.webp";
const sword1 = ITEM_ASSET_FOLDER + "/sword0.webp";
const sword2 = ITEM_ASSET_FOLDER + "/sword2.webp";
const sword3 = ITEM_ASSET_FOLDER + "/sword3.webp";
const sword4 = ITEM_ASSET_FOLDER + "/sword4.webp";
const shield1 = ITEM_ASSET_FOLDER + "/shield0.webp";
const shield2 = ITEM_ASSET_FOLDER + "/shield2.webp";
const shield3 = ITEM_ASSET_FOLDER + "/shield3.webp";
const uncle = ITEM_ASSET_FOLDER + "/uncle.webp";

function hasFoundItem(dataAtOffset, hexMask) {
  return (dataAtOffset & hexMask) !== 0;
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
  const silverMask = 0x20;

  return {
    subscribe,
    updateFromQUsbData: (qusbData) => {
      // Make this less shitty
      if (hasFoundItem(qusbData[hexOffset], bowMask)) {
        set(qusbData[hexOffset] === bowMask ? 1 : 2);
      } else {
        set(0);
      }
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

function createDungeonStore(smallKeyHexOffset, bigKeyHexOffset, bigKeyMask) {
  const { subscribe, set, update } = writable({
    smallKeys: 0,
    bigKey: false,
    manualBigKey: false,
  });

  return {
    subscribe,
    updateFromQUsbData: (qusbData) => {
      update((dungeon) => {
        if (qusbData[smallKeyHexOffset] > dungeon.smallKeys) {
          dungeon.smallKeys = qusbData[smallKeyHexOffset];
        }
        if (!dungeon.manualBigKey) {
          dungeon.bigKey = hasFoundItem(qusbData[bigKeyHexOffset], bigKeyMask);
        }
        return dungeon;
      });
    },
    toggleManualBigKey: () => {
      update((dungeon) => {
        dungeon.manualBigKey = true;
        dungeon.bigKey = !dungeon.bigKey;
        return dungeon;
      });
    },
    set,
    reset: () => set({ smallKeys: 0, bigKey: false, manualBigKey: false }),
  };
}

function createBomb(hexOffset) {
  const { subscribe, set } = writable(0);

  return {
    subscribe,
    updateFromQUsbData: (qusbData) => {
      set(qusbData[hexOffset] > 0 ? 1 : 0);
    },
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
  {
    name: "bombs",
    type: "item",
    images: [bombs, bombs],
    autotrackState: createBomb(0x343),
  },
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
    autotrackState: createDungeonStore(0x37c, 0x367, 0xc0),
    bigKey: false,
    itemCount: 8,
  },
  {
    name: "EP",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 0,
    smallKeyMin: 0,
    smallKeyGoMode: 0,
    autotrackState: createDungeonStore(0x37e, 0x367, 0x20),
    bigKey: true,
    itemCount: 6,
  },
  {
    name: "DP",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 1,
    smallKeyMin: 1,
    smallKeyGoMode: 0,
    autotrackState: createDungeonStore(0x37f, 0x367, 0x10),
    bigKey: true,
    itemCount: 6,
  },
  {
    name: "TH",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 1,
    smallKeyMin: 1,
    smallKeyGoMode: 0,
    autotrackState: createDungeonStore(0x386, 0x366, 0x20),
    bigKey: true,
    itemCount: 6,
  },
  {
    name: "AT",
    type: "dungeon",
    images: [aganim, aganim],
    smallKeyMax: 2,
    smallKeyMin: 2,
    smallKeyGoMode: 2,
    autotrackState: createDungeonStore(0x380),
    bigKey: false,
    itemCount: 2,
  },
  {
    name: "PD",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 6,
    smallKeyMin: 4,
    smallKeyGoMode: 1,
    autotrackState: createDungeonStore(0x382, 0x367, 0x02),
    bigKey: true,
    itemCount: 14,
  },
  {
    name: "SP",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 1,
    smallKeyMin: 1,
    smallKeyGoMode: 1,
    autotrackState: createDungeonStore(0x381, 0x367, 0x04),
    bigKey: true,
    itemCount: 10,
  },
  {
    name: "SW",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 3,
    smallKeyMin: 0,
    smallKeyGoMode: 0,
    autotrackState: createDungeonStore(0x384, 0x366, 0x80),
    bigKey: true,
    itemCount: 8,
  },
  {
    name: "TT",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 1,
    smallKeyMin: 1,
    smallKeyGoMode: 0,
    autotrackState: createDungeonStore(0x387, 0x366, 0x10),
    bigKey: true,
    itemCount: 8,
  },
  {
    name: "IP",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 2,
    smallKeyMin: 0,
    smallKeyGoMode: 0,
    autotrackState: createDungeonStore(0x385, 0x366, 0x40),
    bigKey: true,
    itemCount: 8,
  },
  {
    name: "MM",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 3,
    smallKeyMin: 0,
    smallKeyGoMode: 0,
    autotrackState: createDungeonStore(0x383, 0x367, 0x01),
    bigKey: true,
    itemCount: 8,
  },
  {
    name: "TR",
    type: "dungeon",
    images: [null, crystal, redCrystal, pendant, greenPendant],
    smallKeyMax: 4,
    smallKeyMin: 4,
    smallKeyGoMode: 3,
    autotrackState: createDungeonStore(0x388, 0x366, 0x08),
    bigKey: true,
    itemCount: 12,
  },
  {
    name: "GT",
    type: "dungeon",
    images: [aganim, aganim],
    smallKeyMax: 4,
    smallKeyMin: 4,
    smallKeyGoMode: 1,
    autotrackState: createDungeonStore(0x389, 0x366, 0x04),
    bigKey: true,
    itemCount: 27,
  },
];

export default items;
