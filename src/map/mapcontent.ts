import type { MarkerData } from "./markers";

const overworldDarkLight = "images/overworld-dark-light.png";

interface MapContent {
  image: string;
  markers: Array<MarkerData>;
}

// constants used for translating pixel values to map coordinates
export const mapUnit = 16;
export const imageHeight = 4096;

// Spots where unique items can be found
const itemMarkers: Array<MarkerData> = [
  {
    name: "Kakariko Bottle Merchant",
    id: "item-kak-merchant",
    type: "item",
    xy: [384, 1920],
  },
  {
    name: "Race game reward",
    id: "item-racegame",
    type: "item",
    xy: [128, 2880],
  },
  {
    name: "Flute Digging Spot",
    id: "item-flute",
    type: "item",
    xy: [1176, 2712],
  },
  {
    name: "Tavern Back",
    id: "item-kak-tavern-back",
    type: "item",
    xy: [656, 2320],
  },
];

// Bushes, rocks that drop bombs, rupees etc.
// const itemDropMarkers;

const otherMarkers: Array<MarkerData> = [
  {
    name: "Kakariko Bird Statue",
    id: "undefined-kak-birdstate",
    type: "undefined",
    xy: [520, 1952],
  },
];

function popupVideoHtml(
  src: string,
  playbackSlice: Array<number> | null = null
) {
  let startEnd =
    playbackSlice !== null
      ? `?start=${playbackSlice[0]}&end=${playbackSlice[1]}`
      : "";
  return `<iframe width="320" height="180"\
  src="${src}${startEnd}">\
  </iframe>`;
}

const glitchMarkers: Array<MarkerData> = [
  {
    name: "Desert Ledge O.B.",
    id: "glitch-desert-ledge-ob",
    type: "glitch",
    xy: [96, 2992],
    popup: popupVideoHtml("https://www.youtube.com/embed/mku2i_Vq3Do"),
  },
  {
    name: "Spectacle Rock O.B.",
    id: "glitch-spectacle-rock-ob",
    type: "glitch",
    xy: [2120, 297],
    popup: popupVideoHtml("https://www.youtube.com/embed/mf5mvuJaQaY", [
      1189,
      1196,
    ]),
  },
  {
    name: "Race Game O.B.",
    id: "glitch-race-game-ob",
    type: "glitch",
    xy: [96, 2504],
    popup: popupVideoHtml("https://www.youtube.com/embed/mf5mvuJaQaY", [
      1296,
      1316,
    ]),
  },
  {
    name: "Checkerboard Cave O.B.",
    id: "glitch-checkerboard-cave-ob",
    type: "glitch",
    xy: [520, 3168],
    popup: popupVideoHtml("https://www.youtube.com/embed/mf5mvuJaQaY", [
      1317,
      1327,
    ]),
  },
];

const mapContent: MapContent = {
  image: overworldDarkLight,
  markers: [
    {
      name: "Link's House",
      id: "entrance-lw-mid-links-house",
      type: "entrance",
      xy: [2240, 2816],
    },
    {
      name: "Cave 45",
      id: "entrance-lw-mid-cave-45",
      type: "entrance",
      xy: [1088, 3392],
    },
    {
      name: "Bonk Fairy (Light)",
      id: "entrance-lw-mid-bonk-fairy",
      type: "entrance",
      xy: [1936, 2688],
    },
    {
      name: "Lost Woods Gamble",
      id: "entrance-lw-lost-woods-gamble",
      type: "entrance",
      xy: [760, 64],
    },
    {
      name: "Lumberjack House",
      id: "entrance-lw-lumberjack-house",
      type: "entrance",
      xy: [1376, 256],
    },
    {
      name: "Lumberjack Tree (Bottom)",
      id: "entrance-lw-lumberjack-tree-bottom",
      type: "entrance",
      xy: [1360, 144],
    },
    {
      name: "Lumberjack Tree (Top)",
      id: "entrance-lw-lumberjack-tree-top",
      type: "entrance",
      xy: [1232, 320],
    },
    {
      name: "Return Cave (West)",
      id: "entrance-lw-dm-return-cave-west",
      type: "entrance",
      xy: [1472, 640],
    },
    {
      name: "Old Man Cave Exit (West)",
      id: "entrance-lw-north-old-man-cave-exit-west",
      type: "entrance",
      xy: [1456, 736],
    },
    {
      name: "Lost Woods Hideout (Bottom)",
      id: "entrance-lw-lost-woods-hideout-bottom",
      type: "entrance",
      xy: [752, 624],
    },
    {
      name: "Lost Woods Hideout (Top)",
      id: "entrance-lw-lost-woods-hideout-top",
      type: "entrance",
      xy: [776, 536],
    },
    {
      name: "Fortune Teller (Light)",
      id: "entrance-lw-kak-fortune-teller",
      type: "entrance",
      xy: [768, 1328],
    },
    {
      name: "Elder House Exit (East)",
      id: "entrance-lw-kak-elder-house-exit-east",
      type: "entrance",
      xy: [688, 1728],
    },
    {
      name: "Elder House Exit (West)",
      id: "entrance-lw-kak-elder-house-exit-west",
      type: "entrance",
      xy: [624, 1728],
    },
    {
      name: "Blind's Hut",
      id: "entrance-lw-kak-blinds-hut",
      type: "entrance",
      xy: [528, 1728],
    },
    {
      name: "Kakariko Well (Bottom)",
      id: "entrance-lw-kak-well-bottom",
      type: "entrance",
      xy: [192, 1760],
    },
    {
      name: "Kakariko Well (Top)",
      id: "entrance-lw-kak-well-top",
      type: "entrance",
      xy: [96, 1744],
    },
    {
      name: "Snitch Lady (West)",
      id: "entrance-lw-kak-snitch-lady-west",
      type: "entrance",
      xy: [208, 1920],
    },
    {
      name: "Snitch Lady (East)",
      id: "entrance-lw-kak-snitch-lade-east",
      type: "entrance",
      xy: [848, 1984],
    },
    {
      name: "Bush Covered House",
      id: "entrance-lw-kak-bush-covered-house",
      type: "entrance",
      xy: [832, 2192],
    },
    {
      name: "Sick Kid's House",
      id: "entrance-lw-kak-sick-kids-house",
      type: "entrance",
      xy: [640, 2208],
    },
    {
      name: "Hen House",
      id: "entrance-lw-kak-henhouse",
      type: "entrance",
      xy: [400, 2224],
    },
    {
      name: "Light World Bomb Hut",
      id: "entrance-lw-kak-bomb-hut",
      type: "entrance",
      xy: [112, 2448],
    },
    {
      name: "Kakariko Shop",
      id: "entrance-lw-kak-shop",
      type: "entrance",
      xy: [448, 2400],
    },
    {
      name: "Tavern (Front)",
      id: "entrance-lw-kak-tavern-front",
      type: "entrance",
      xy: [656, 2448],
    },
    {
      name: "Blacksmiths' Hut",
      id: "entrance-lw-kak-blacksmiths-hut",
      type: "entrance",
      xy: [1248, 2192],
    },
    {
      name: "Bat Cave Exit",
      id: "entrance-lw-kak-bat-cave-exit",
      type: "entrance",
      xy: [1296, 2288],
    },
    {
      name: "Bat Cave Drop",
      id: "entrance-lw-kak-bat-cave-drop",
      type: "entrance",
      xy: [1328, 2304],
    },
    {
      name: "Library",
      id: "entrance-lw-kak-library",
      type: "entrance",
      xy: [640, 2704],
    },
    {
      name: "Kakariko Gamble Game",
      id: "entrance-lw-kak-gamble-game",
      type: "entrance",
      xy: [880, 2880],
    },
    {
      name: "Two Brothers House Exit (East)",
      id: "entrance-lw-kak-two-brothers-house-exit-east",
      type: "entrance",
      xy: [576, 2944],
    },
    {
      name: "Two Brothers House Exit (West)",
      id: "entrance-lw-kak-two-brothers-house-exit-west",
      type: "entrance",
      xy: [448, 2944],
    },
    {
      name: "Bonk Rock Cave",
      id: "entrance-north-bonk-rock-cave",
      type: "entrance",
      xy: [1600, 1200],
    },
    {
      name: "Sanctuary",
      id: "entrance-north-sanctuary",
      type: "entrance",
      xy: [1888, 1104],
    },
    {
      name: "Sanctuary Drop",
      id: "entrance-lw-north-sanctuary-drop",
      type: "entrance",
      xy: [2128, 1216],
    },
    {
      name: "Graveyard Cave",
      id: "entrance-lw-north-graveyard-cave",
      type: "entrance",
      xy: [2336, 1136],
    },
    {
      name: "King's Grave",
      id: "entrance-lw-north-kings-grave",
      type: "entrance",
      xy: [2464, 1232],
    },
    {
      name: "North Fairy Cave Exit",
      id: "entrance-lw-north-fairy-cave-exit",
      type: "entrance",
      xy: [2736, 1136],
    },
    {
      name: "North Fairy Cave Drop",
      id: "entrance-lw-north-fairy-cave-drop",
      type: "entrance",
      xy: [2632, 1272],
    },
    {
      name: "Witch's Hut",
      id: "entrance-lw-east-witch-hut",
      type: "entrance",
      xy: [3280, 1376],
    },
    {
      name: "Waterfall of Wishing",
      id: "entrance-lw-east-waterfall-of-wishing",
      type: "entrance",
      xy: [3688, 560],
    },
    {
      name: "Eastern Palace",
      id: "entrance-lw-east-eastern-palace",
      type: "entrance",
      xy: [3928, 1600],
    },
    {
      name: "Sahasrala's Hut",
      id: "entrance-lw-east-sahasrala",
      type: "entrance",
      xy: [3320, 1872],
    },
    {
      name: "Long Fairy Cave",
      id: "entrance-lw-east-long-fairy-cave",
      type: "entrance",
      xy: [4016, 2880],
    },
    {
      name: "Fairy Cave, East",
      id: "entrance-lw-east-fairy",
      type: "entrance",
      xy: [3376, 2656],
    },
    {
      name: "Hyrule Castle Secret Entrance Drop",
      id: "entrance-lw-hc-secret-entrance-drop",
      type: "entrance",
      xy: [2440, 1704],
    },
    {
      name: "Hyrule Castle Secret Entrance Exit",
      id: "entrance-lw-hc-secret-entrance-exit",
      type: "entrance",
      xy: [2256, 1776],
    },
    {
      name: "Hyrule Castle Entrance (South)",
      id: "entrance-hc-south",
      type: "entrance",
      xy: [2048, 1808],
    },
    {
      name: "Hyrule Castle Entrance (West)",
      id: "entrance-hc-west",
      type: "entrance",
      xy: [1840, 1600],
    },
    {
      name: "Hyrule Castle Entrance (East)",
      id: "entrance-hc-east",
      type: "entrance",
      xy: [2256, 1600],
    },
    {
      name: "Agahnim",
      id: "entrance-hc-at",
      type: "entrance",
      xy: [2048, 1648],
    },
    {
      name: "Swamp Healer Fairy",
      id: "entrance-lw-swamp-healer-fairy",
      type: "entrance",
      xy: [2448, 3200],
    },
    {
      name: "Dam",
      id: "entrance-lw-swamp-dam",
      type: "entrance",
      xy: [1920, 3840],
    },
    {
      name: "Mini Moldorm Cave",
      id: "entrance-lw-lake-mini-moldorm-cave",
      type: "entrance",
      xy: [2672, 3856],
    },
    {
      name: "Lake Hylia Fortune Teller",
      id: "entrance-lw-lake-fortune-teller",
      type: "entrance",
      xy: [2656, 3296],
    },
    {
      name: "Cave Shop (Lake Hylia)",
      id: "entrance-lw-lake-cave-shop",
      type: "entrance",
      xy: [2976, 3152],
    },
    {
      name: "Capacity Upgrade",
      id: "entrance-lw-lake-healer-fairy",
      type: "entrance",
      xy: [3248, 3504],
    },
    {
      name: "Good Bee Cave",
      id: "entrance-lw-lake-good-bee-cave",
      type: "entrance",
      xy: [3744, 3168],
    },
    {
      name: "Ice Rod Cave",
      id: "entrance-lw-lake-ice-rod-cave",
      type: "entrance",
      xy: [3664, 3168],
    },
    {
      name: "20 Rupee Cave",
      id: "entrance-lw-lake-20-rupee-cave",
      type: "entrance",
      xy: [3696, 3232],
    },
    {
      name: "Desert Route Boulder Cave",
      id: "entrance-lw-desert-route-boulder-cave",
      type: "entrance",
      xy: [1280, 3936],
    },
    {
      name: "Desert Healer Fairy",
      id: "entrance-lw-desert-fairy",
      type: "entrance",
      xy: [1136, 3664],
    },
    {
      name: "Aginah's Cave",
      id: "entrance-lw-desert-aginahs-cave",
      type: "entrance",
      xy: [816, 3392],
    },
    {
      name: "Checkerboard Cave",
      id: "entrance-lw-desert-checkerboard-cave",
      type: "entrance",
      xy: [720, 3200],
    },
    {
      name: "Desert Palace Entrance (North)",
      id: "entrance-lw-desert-palace-north",
      type: "entrance",
      xy: [304, 3152],
    },
    {
      name: "Desert Palace Entrance (East)",
      id: "entrance-lw-desert-palace-east",
      type: "entrance",
      xy: [464, 3264],
    },
    {
      name: "Desert Palace Entrance (West)",
      id: "entrance-lw-desert-palace-west",
      type: "entrance",
      xy: [144, 3264],
    },
    {
      name: "Desert Palace Entrance (South)",
      id: "entrance-lw-desert-palace-south",
      type: "entrance",
      xy: [304, 3264],
    },
    {
      name: "Old Man Cave Exit (East)",
      id: "entrance-lw-dm-old-man-cave-exit-east",
      type: "entrance",
      xy: [1664, 784],
    },
    {
      name: "Return Cave (East)",
      id: "entrance-lw-dm-return-cave-east",
      type: "entrance",
      xy: [1616, 576],
    },
    {
      name: "Old Man House (Bottom)",
      id: "entrance-lw-dm-old-man-house-bottom",
      type: "entrance",
      xy: [1840, 960],
    },
    {
      name: "Old Man House (Top)",
      id: "entrance-lw-dm-old-man-cave-exit-top",
      type: "entrance",
      xy: [2192, 672],
    },
    {
      name: "Spectacle Rock Cave (Bottom)",
      id: "entrance-lw-dm-spectacle-rock-cave-bottom",
      type: "entrance",
      xy: [1872, 576],
    },
    {
      name: "Spectacle Rock Cave (Peak)",
      id: "entrance-lw-dm-spectacle-rock-cave-peak",
      type: "entrance",
      xy: [2000, 432],
    },
    {
      name: "Spectacle Rock Cave (Top)",
      id: "entrance-lw-dm-spectacle-rock-top",
      type: "entrance",
      xy: [2000, 608],
    },
    {
      name: "Tower of Hera",
      id: "entrance-lw-dm-toh",
      type: "entrance",
      xy: [2296, 144],
    },
    {
      name: "Paradox Cave (Top)",
      id: "entrance-lw-dm-paradox-cave-top",
      type: "entrance",
      xy: [3520, 272],
    },
    {
      name: "Mimic Cave",
      id: "entrance-lw-dm-mimic-cave",
      type: "entrance",
      xy: [3456, 364],
    },
    {
      name: "Spiral Cave (Top)",
      id: "entrance-lw-dm-spiral-cave-top",
      type: "entrance",
      xy: [3264, 384],
    },
    {
      name: "Fairy Ascension Cave (Top)",
      id: "entrance-lw-dm-fairy-ascension-cave-top",
      type: "entrance",
      xy: [3360, 480],
    },
    {
      name: "Spiral Cave (Bottom)",
      id: "entrance-lw-dm-spiral-cave-bottom",
      type: "entrance",
      xy: [3280, 544],
    },
    {
      name: "Hookshot Fairy",
      id: "entrance-lw-dm-hookshot-fairy-cave",
      type: "entrance",
      xy: [3360, 576],
    },
    {
      name: "Hookshot Fairy",
      id: "entrance-lw-dm-hookshot-fairy",
      type: "entrance",
      xy: [3456, 608],
    },
    {
      name: "Paradox Cave (Bottom)",
      id: "entrance-lw-dm-paradox-cave-bottom",
      type: "entrance",
      xy: [3504, 608],
    },
    {
      name: "Paradoc Cave (Middle)",
      id: "entrance-lw-dm-paradox-cave-middle",
      type: "entrance",
      xy: [3536, 900],
    },

    // Dark World Entrances

    // Skull Woods
    {
      name: "Skull Woods, Main",
      id: "entrance-dw-skull-woods-main",
      type: "entrance",
      xy: [4256, 228],
    },

    {
      name: "Skull Woods, Middle Dropdown",
      id: "entrance-dw-skull-woods-mid-dropdown",
      type: "entrance",
      xy: [4592, 368],
    },
    {
      name: "Skull Woods, Middle Left",
      id: "entrance-dw-skull-woods-mid-left",
      type: "entrance",
      xy: [4336, 544],
    },
    {
      name: "Skull Woods, Middle Right",
      id: "entrance-dw-skull-woods-mid-right",
      type: "entrance",
      xy: [4688, 608],
    },
    {
      name: "Skull Woods, Front",
      id: "entrance-dw-skull-woods-front",
      type: "entrance",
      xy: [4848, 624],
    },
    {
      name: "Skull Woods, Front Dropdown Left",
      id: "entrance-dw-skull-woods-front-dropdown-left",
      type: "entrance",
      xy: [4736, 720],
    },
    {
      name: "Skull Woods, Front Dropdown Right",
      id: "entrance-dw-skull-woods-front-dropdown-right",
      type: "entrance",
      xy: [4896, 688],
    },
    {
      name: "Skull Woods, Front Dropdown Top",
      id: "entrance-dw-skull-woods-front-dropdown-top",
      type: "entrance",
      xy: [4872, 536],
    },

    // Dark world north
    {
      name: "Dark World Lumberjack Shop",
      id: "entrance-dw-north-lumberjack-shop",
      type: "entrance",
      xy: [5472, 240],
    },
    {
      name: "Bumper Cave (Top)",
      id: "entrance-dw-north-bumper-cave-top",
      type: "entrance",
      xy: [5568, 640],
    },
    {
      name: "Bumper Cave (Bottom)",
      id: "entrance-dw-north-bumper-cave-bottom",
      type: "entrance",
      xy: [5552, 736],
    },
    {
      name: "Loner House",
      id: "entrance-dw-north-loner-house",
      type: "entrance",
      xy: [5458, 1888],
    },
    {
      name: "Dark Sanctuary Hint",
      id: "entrance-dw-north-sanctuary",
      type: "entrance",
      xy: [5984, 1136],
    },
    {
      name: "Dark World Witch's Hut",
      id: "entrance-dw-north-witch-hit",
      type: "entrance",
      xy: [7392, 1392],
    },

    // Village of Outcasts
    {
      name: "Fortune Teller (Dark)",
      id: "entrance-dw-vo-fortune-teller",
      type: "entrance",
      xy: [4864, 1328],
    },
    {
      name: "Chest Game",
      id: "entrance-dw-vo-chest-game",
      type: "entrance",
      xy: [4304, 1920],
    },
    {
      name: "Thieves' Town",
      id: "entrance-dw-vo-thieves-town",
      type: "entrance",
      xy: [4608, 2000],
    },
    {
      name: "C-Shaped House",
      id: "entrance-dw-vo-c-shaped-house",
      type: "entrance",
      xy: [4944, 1984],
    },
    {
      name: "Hammer Locked House",
      id: "entrance-dw-vo-hammer-locked-house",
      type: "entrance",
      xy: [4928, 2192],
    },
    {
      name: "Brewery",
      id: "entrance-dw-vo-brewery",
      type: "entrance",
      xy: [4544, 2400],
    },
    {
      name: "Hammer Peg Cave",
      id: "entrance-dw-vo-hammer-peg-cave",
      type: "entrance",
      xy: [5392, 2496],
    },
    {
      name: "Archery Game",
      id: "entrance-dw-vo-archery-game",
      type: "entrance",
      xy: [4976, 2880],
    },

    // Pyramid
    {
      name: "Pyramid Dropdown",
      id: "entrance-dw-pyramid-dropdown",
      type: "entrance",
      xy: [6136, 1664],
    },
    {
      name: "Pyramid Left",
      id: "entrance-dw-pyramid-left",
      type: "entrance",
      xy: [5872, 2000],
    },
    {
      name: "Pyramid Fairy",
      id: "entrance-dw-pyramid-fairy",
      type: "entrance",
      xy: [6016, 2000],
    },

    // Dark World Mid
    {
      name: "Big Bomb Shop",
      id: "entrance-dw-mid-big-bomb-shop",
      type: "entrance",
      xy: [6336, 2832],
    },
    {
      name: "Bonk Fairy (Dark)",
      id: "entrance-dw-mid-bonk-fairy",
      type: "entrance",
      xy: [6032, 2688],
    },

    // Dark world dam area
    {
      name: "Hype Cave",
      id: "entrance-dw-swamp-hype-cave",
      type: "entrance",
      xy: [6544, 3200],
    },
    {
      name: "Swamp Palace",
      id: "entrance-dw-swamp-palace",
      type: "entrance",
      xy: [6016, 3840],
    },

    // Dark World Lake Hylia
    {
      name: "Lake House",
      id: "entrance-dw-lake-house",
      type: "entrance",
      xy: [6752, 3296],
    },
    {
      name: "Ice Palace",
      id: "entrance-dw-lake-ice-palace",
      type: "entrance",
      xy: [7360, 3536],
    },
    {
      name: "Dark Lake Hylia Ledge Fairy",
      id: "entrance-dw-lake-ledge-fairy",
      type: "entrance",
      xy: [7760, 3168],
    },
    {
      name: "Dark Lake Hylia Ledge Hint",
      id: "entrance-dw-lake-ledge-hint",
      type: "entrance",
      xy: [7840, 3168],
    },
    {
      name: "Dark Lake Hylia Ledge Spike Cave",
      id: "entrance-dw-lake-ledge-spike-cave",
      type: "entrance",
      xy: [7792, 3232],
    },

    // Dark World Eastern Area
    {
      name: "Fairy Cave, East",
      id: "entrance-dw-east-fairy",
      type: "entrance",
      xy: [7472, 2656],
    },
    {
      name: "Fake PoD",
      id: "entrance-dw-east-fake-pod",
      type: "entrance",
      xy: [7576, 2064],
    },
    {
      name: "Palace of Darkness",
      id: "entrance-dw-east-pod",
      type: "entrance",
      xy: [8024, 1632],
    },
    {
      name: "Portal Cave",
      id: "entrance-dw-east-portal-cave",
      type: "entrance",
      xy: [8112, 2880],
    },

    // Misery Mire Area
    {
      name: "Dark Desert Fairy",
      id: "entrance-dw-desert-fairy",
      type: "entrance",
      xy: [4912, 3392],
    },
    {
      name: "Dark Desert Hint",
      id: "entrance-dw-desert-hint",
      type: "entrance",
      xy: [4544, 3280],
    },
    {
      name: "Mire Shed",
      id: "entrance-dw-desert-mire-shed",
      type: "entrance",
      xy: [4256, 3280],
    },
    {
      name: "Misery Mire",
      id: "entrance-dw-desert-misery-mire",
      type: "entrance",
      xy: [4400, 3312],
    },

    // Dark Death Mountain
    {
      name: "Spike Cave Hint Cave",
      id: "entrance-dw-dm-spike-cave-hint-cave",
      type: "entrance",
      xy: [5760, 784],
    },
    {
      name: "Spike Cave",
      id: "entrance-dw-dm-spike-cave",
      type: "entrance",
      xy: [6448, 608],
    },
    {
      name: "Ganon's Tower",
      id: "entrance-dw-dm-ganons-tower",
      type: "entrance",
      xy: [6400, 80],
    },
    {
      name: "Hookshot Cave (North)",
      id: "entrance-dw-dm-hookshot-cave-north",
      type: "entrance",
      xy: [7376, 80],
    },
    {
      name: "Hookshot Cave (South)",
      id: "entrance-dw-dm-hookshot-cave-south",
      type: "entrance",
      xy: [7504, 288],
    },
    {
      name: "Superbunny Cave, Top",
      id: "entrance-dw-dm-superbunny-cave-top",
      type: "entrance",
      xy: [7616, 272],
    },
    {
      name: "Turtle Rock Ledge Entrance (West)",
      id: "entrance-dw-dm-turtle-rock-west",
      type: "entrance",
      xy: [7360, 384],
    },
    {
      name: "Turtle Rock Ledge Entrance (East)",
      id: "entrance-dw-dm-turtle-rock-eastt",
      type: "entrance",
      xy: [7552, 384],
    },
    {
      name: "Turtle Rock Isolated Ledge Entrance",
      id: "entrance-dw-dm-turtle-rock-isolated-ledge-entrance",
      type: "entrance",
      xy: [7456, 480],
    },
    {
      name: "Superbunny Cave, Bottom",
      id: "entrance-dw-dm-superbunny-cave-bot",
      type: "entrance",
      xy: [7552, 608],
    },
    {
      name: "Shop",
      id: "entrance-dw-dm-shop",
      type: "entrance",
      xy: [7600, 608],
    },
    {
      name: "Turtle Rock, Main",
      id: "entrance-dw-dm-turtle-rock-main",
      type: "entrance",
      xy: [7952, 362],
    },
  ],
};

mapContent.markers.push(...glitchMarkers);

export default mapContent;
