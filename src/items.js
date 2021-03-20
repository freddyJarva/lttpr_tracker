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

function createBinaryItem() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    set,
    toggle: () => update((n) => (n == 0 ? 1 : 0)),
    reset: () => set(0),
  };
}

const items = [
  { name: "bow", type: "item", images: [bow, bow, silvers] },
  { name: "blue", type: "doubleItem", images: [blumerang, blumerang] },
  { name: "boomerang", type: "doubleItem", images: [boomerang, boomerang] },
  {
    name: "hookshot",
    type: "item",
    images: [hookshot, hookshot],
    hexOffset: 0x342,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  { name: "bombs", type: "item", images: [bombs, bombs] },
  { name: "powder", type: "doubleItem", images: [powder, powder] },
  { name: "shroom", type: "doubleItem", images: [shroom, shroom] },

  {
    name: "frod",
    type: "item",
    images: [frod, frod],
    hexOffset: 0x345,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "irod",
    type: "item",
    images: [irod, irod],
    hexOffset: 0x346,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "bombos",
    type: "medallion",
    entryTo: ["", "MM", "TR", "BOTH"],
    images: [bombos, bombos],
    hexOffset: 0x347,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "ether",
    type: "medallion",
    entryTo: ["", "MM", "TR", "BOTH"],
    images: [ether, ether],
    hexOffset: 0x348,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "quake",
    type: "medallion",
    entryTo: ["", "MM", "TR", "BOTH"],
    images: [quake, quake],
    hexOffset: 0x348,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },

  {
    name: "lantern",
    type: "item",
    images: [lantern, lantern],
    hexOffset: 0x349,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "hammer",
    type: "item",
    images: [hammer, hammer],
    hexOffset: 0x34b,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  { name: "flute", type: "doubleItem", images: [flute, flute] },
  { name: "shovel", type: "doubleItem", images: [shovel, shovel] },
  {
    name: "net",
    type: "item",
    images: [net, net],
    hexOffset: 0x34d,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "book",
    type: "item",
    images: [book, book],
    hexOffset: 0x34e,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },

  {
    name: "bottle",
    type: "item",
    images: [bottle, bottle1, bottle2, bottle3, bottle4],
  },
  {
    name: "somaria",
    type: "item",
    images: [somaria, somaria],
    hexOffset: 0x350,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "byrna",
    type: "item",
    images: [byrna, byrna],
    hexOffset: 0x351,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "cape",
    type: "item",
    images: [cape, cape],
    hexOffset: 0x352,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "mirror",
    type: "item",
    images: [mirror, mirror],
    hexOffset: 0x353,
    hexMask: 0x02,
    autotrackState: createBinaryItem(),
  },

  {
    name: "boots",
    type: "item",
    images: [boots, boots],
    hexOffset: 0x355,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "glove",
    type: "item",
    images: [glove1, glove1, glove2],
    hexOffset: 0x354,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "flippers",
    type: "item",
    images: [flippers, flippers],
    hexOffset: 0x356,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "orb",
    type: "item",
    images: [orb, orb],
    hexOffset: 0x357,
    hexMask: 0x01,
    autotrackState: createBinaryItem(),
  },
  {
    name: "sword",
    type: "doubleItem",
    images: [sword1, sword1, sword2, sword3, sword4],
  },
  {
    name: "shield",
    type: "doubleItem",
    images: [shield1, shield1, shield2, shield3],
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
