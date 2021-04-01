import * as L from "leaflet";
import type { Writable } from "svelte/store";

const overworldDarkLight = "images/overworld-dark-light.png";

export interface MarkerData {
  name: string;
  id: string;
  type: string;
  xy: Array<number>;
  popup?: any;
}

export interface InteractiveMarker {
  data: MarkerData;
  node: L.Marker;
  isActive: boolean;
  notes?: Writable<string>;
}

interface MapContent {
  image: string;
  markers: Array<MarkerData>;
}

const mapIcons = {
  entrance: L.icon({
    iconUrl: "icons/map-marker-door-green.svg",
    shadowUrl: "icons/map-marker-shadow.svg",

    iconSize: [20, 30], // size of the icon
    shadowSize: [20, 30], // size of the shadow
    iconAnchor: [10, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, -20],
    shadowAnchor: [1, 22], // the same for the shadow
  }),
  glitch: L.icon({
    iconUrl: "icons/map-marker-glitch-improved.svg",

    iconSize: [40, 30],
    iconAnchor: [20, 30],
    popupAnchor: [0, -32],
    tooltipAnchor: [14, -15],
  }),
  default: new L.Icon.Default(),
  inactive: L.icon({
    iconUrl: "icons/map-marker-door-red.svg",
    shadowUrl: "icons/map-marker-shadow.svg",

    iconSize: [20, 30], // size of the icon
    shadowSize: [20, 30], // size of the shadow
    iconAnchor: [10, 30], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, -20],
    shadowAnchor: [1, 22], // the same for the shadow
  }),
};

export function isInteractiveMarker(
  marker: InteractiveMarker | MarkerData
): marker is InteractiveMarker {
  return (marker as InteractiveMarker).isActive !== undefined;
}

export function iconFor(marker: InteractiveMarker | MarkerData): L.Icon {
  if (isInteractiveMarker(marker)) {
    if (!marker.isActive) {
      return mapIcons.inactive;
    } else {
      marker = marker.data;
    }
  }
  return mapIcons[marker.type] === undefined
    ? mapIcons.default
    : mapIcons[marker.type];
}

export const doorIcon = L.icon({
  iconUrl: "icons/map-marker-door-green.svg",
  shadowUrl: "icons/map-marker-shadow.svg",

  iconSize: [20, 30], // size of the icon
  shadowSize: [20, 30], // size of the shadow
  iconAnchor: [10, 30], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  tooltipAnchor: [12, -20],
  shadowAnchor: [1, 22], // the same for the shadow
});

export const defaultIcon = new L.Icon.Default();

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
      id: "house-link",
      type: "entrance",
      xy: [2240, 2816],
    },

    {
      name: "Chest Game",
      id: "entrance-lw-game",
      type: "entrance",
      xy: [760, 64],
    },
    {
      name: "Lumberjack Cave",
      id: "entrance-lumberjack-cave",
      type: "entrance",
      xy: [1360, 144],
    },
    {
      name: "Lumberjack's house",
      id: "entrance-house-lumberjack",
      type: "entrance",
      xy: [1376, 256],
    },
    {
      name: "Lumberjack Cave Dropdown",
      id: "entrance-dropdown-lumberjack",
      type: "entrance",
      xy: [1232, 320],
    },
    {
      name: "Exit Cave, Ledge",
      id: "entrance-exit-cave-ledge",
      type: "entrance",
      xy: [1472, 640],
    },
    {
      name: "Ascension Cave, Bottom",
      id: "entrance-ascension-cave-bot",
      type: "entrance",
      xy: [1456, 736],
    },
    {
      name: "Thief Hut",
      id: "entrance-lw-thief",
      type: "entrance",
      xy: [752, 624],
    },
    {
      name: "Thief Hut Dropdown",
      id: "entrance-lw-thief-dropdown",
      type: "entrance",
      xy: [776, 536],
    },
    {
      name: "Fortune Teller",
      id: "entrance-kak-fortune",
      type: "entrance",
      xy: [768, 1328],
    },
    {
      name: "Elder Right",
      id: "entrance-kak-elder-right",
      type: "entrance",
      xy: [688, 1728],
    },
    {
      name: "Elder Left",
      id: "entrance-kak-elder-left",
      type: "entrance",
      xy: [624, 1728],
    },
    {
      name: "Blind's Hut",
      id: "entrance-kak-blinds-hut",
      type: "entrance",
      xy: [528, 1728],
    },
    {
      name: "Kakariko Well",
      id: "entrance-kak-well",
      type: "entrance",
      xy: [192, 1760],
    },
    {
      name: "Kakariko Well Dropdown",
      id: "entrance-kak-well-dropdown",
      type: "entrance",
      xy: [96, 1744],
    },
    {
      name: "Snitch Left",
      id: "entrance-kak-snitch-left",
      type: "entrance",
      xy: [208, 1920],
    },
    {
      name: "Snitch Right",
      id: "entrance-kak-snitch-right",
      type: "entrance",
      xy: [848, 1984],
    },
    {
      name: "Bush House",
      id: "entrance-kak-bushhouse",
      type: "entrance",
      xy: [832, 2192],
    },
    {
      name: "Sick Kid",
      id: "entrance-kak-sickkid",
      type: "entrance",
      xy: [640, 2208],
    },
    {
      name: "Hen House",
      id: "entrance-kak-henhouse",
      type: "entrance",
      xy: [400, 2224],
    },
    {
      name: "Bombable Hut",
      id: "entrance-kak-bombable",
      type: "entrance",
      xy: [112, 2448],
    },
    {
      name: "Shop",
      id: "entrance-kak-shop",
      type: "entrance",
      xy: [448, 2400],
    },
    {
      name: "Tavern Front",
      id: "entrance-kak-tavern-front",
      type: "entrance",
      xy: [656, 2448],
    },
    {
      name: "Smiths",
      id: "entrance-kak-smith",
      type: "entrance",
      xy: [1248, 2192],
    },
    {
      name: "Magic Bat",
      id: "entrance-kak-bat",
      type: "entrance",
      xy: [1296, 2288],
    },
    {
      name: "Magic Bat Dropdown",
      id: "entrance-kak-bat-dropdown",
      type: "entrance",
      xy: [1328, 2304],
    },
    {
      name: "Library",
      id: "entrance-kak-library",
      type: "entrance",
      xy: [640, 2704],
    },
    {
      name: "Kakariko Chest Game",
      id: "entrance-kak-game",
      type: "entrance",
      xy: [880, 2880],
    },
    {
      name: "Kakariko Twin Right",
      id: "entrance-kak-twin-right",
      type: "entrance",
      xy: [576, 2944],
    },
    {
      name: "Kakariko Twin Left",
      id: "entrance-kak-twin-left",
      type: "entrance",
      xy: [448, 2944],
    },
    {
      name: "Bonk Rocks",
      id: "entrance-north-bonk-rocks",
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
      name: "Sanctuary Dropdown",
      id: "entrance-north-sanctuary-dropdown",
      type: "entrance",
      xy: [2128, 1216],
    },
    {
      name: "Grave Ledge",
      id: "entrance-north-grave-ledge",
      type: "entrance",
      xy: [2336, 1136],
    },
    {
      name: "King's Grave",
      id: "entrance-north-kings-grave",
      type: "entrance",
      xy: [2464, 1232],
    },
    {
      name: "Fairy Cave",
      id: "entrance-north-fairy",
      type: "entrance",
      xy: [2736, 1136],
    },
    {
      name: "Fairy Cave",
      id: "entrance-north-fairy-dropdown",
      type: "entrance",
      xy: [2632, 1272],
    },
    {
      name: "Witch's Hut",
      id: "entrance-east-witch-hut",
      type: "entrance",
      xy: [3280, 1376],
    },
    {
      name: "Waterfall Fairy",
      id: "entrance-east-waterfall-fairy",
      type: "entrance",
      xy: [3688, 560],
    },
    {
      name: "Eastern Palace",
      id: "entrance-east-eastern-palace",
      type: "entrance",
      xy: [3928, 1600],
    },
    {
      name: "Sahasrala",
      id: "entrance-east-sahasrala",
      type: "entrance",
      xy: [3320, 1872],
    },
    {
      name: "Portal Cave",
      id: "entrance-east-portal-cave",
      type: "entrance",
      xy: [4016, 2880],
    },
    {
      name: "Fairy Cave, East",
      id: "entrance-east-fairy",
      type: "entrance",
      xy: [3376, 2656],
    },
    {
      name: "Uncle",
      id: "entrance-uncle-dropdown",
      type: "entrance",
      xy: [2440, 1704],
    },
    {
      name: "Uncle",
      id: "entrance-uncle",
      type: "entrance",
      xy: [2256, 1776],
    },
    {
      name: "Hyrule Castle Main",
      id: "entrance-hc-main",
      type: "entrance",
      xy: [2048, 1808],
    },
    {
      name: "Hyrule Castle Left",
      id: "entrance-hc-left",
      type: "entrance",
      xy: [1840, 1600],
    },
    {
      name: "Hyrule Castle Right",
      id: "entrance-hc-right",
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
      name: "Bonk Rock Fairies",
      id: "entrance-bonk-rocks-fairy",
      type: "entrance",
      xy: [1936, 2688],
    },
    {
      name: "Dam Fairy",
      id: "entrance-dam-fairy",
      type: "entrance",
      xy: [2448, 3200],
    },
    {
      name: "Dam",
      id: "entrance-dam",
      type: "entrance",
      xy: [1920, 3840],
    },
    {
      name: "Moldorm Cave",
      id: "entrance-lake-moldorm-cave",
      type: "entrance",
      xy: [2672, 3856],
    },
    {
      name: "Lake House",
      id: "entrance-lake-house",
      type: "entrance",
      xy: [2656, 3296],
    },
    {
      name: "Lake Cave",
      id: "entrance-lake-cave",
      type: "entrance",
      xy: [2976, 3152],
    },
    {
      name: "Upgrade Fairy",
      id: "entrance-lake-upgrade-fairy",
      type: "entrance",
      xy: [3248, 3504],
    },
    {
      name: "Icerod Cave, Right",
      id: "entrance-lake-icerod-cave-right",
      type: "entrance",
      xy: [3744, 3168],
    },
    {
      name: "Icerod Cave, Left",
      id: "entrance-lake-icerod-cave-left",
      type: "entrance",
      xy: [3664, 3168],
    },
    {
      name: "Icerod Boulder Cave",
      id: "entrance-lake-icerod-boulder",
      type: "entrance",
      xy: [3696, 3232],
    },
    {
      name: "Desert Route Boulder Cave",
      id: "entrance-desert-route-boulder-cave",
      type: "entrance",
      xy: [1280, 3936],
    },
    {
      name: "Desert Fairy",
      id: "entrance-desert-route-fairy",
      type: "entrance",
      xy: [1136, 3664],
    },
    {
      name: "Aginah's Cave",
      id: "entrance-desert-aginahs-cave",
      type: "entrance",
      xy: [816, 3392],
    },
    {
      name: "Checkerboard Cave",
      id: "entrance-desert-checkerboard-cave",
      type: "entrance",
      xy: [720, 3200],
    },
    {
      name: "Desert Palace, Back",
      id: "entrance-desert-palace-back",
      type: "entrance",
      xy: [304, 3152],
    },
    {
      name: "Desert Palace, Right",
      id: "entrance-desert-palace-right",
      type: "entrance",
      xy: [464, 3264],
    },
    {
      name: "Desert Palace, Left",
      id: "entrance-desert-palace-left",
      type: "entrance",
      xy: [144, 3264],
    },
    {
      name: "Desert Palace, Main",
      id: "entrance-desert-palace-main",
      type: "entrance",
      xy: [304, 3264],
    },
    {
      name: "Ascension Cave, Top",
      id: "entrance-dm-ascension-cave-top",
      type: "entrance",
      xy: [1664, 784],
    },
    {
      name: "Return Cave, Top",
      id: "entrance-dm-return-cave",
      type: "entrance",
      xy: [1616, 576],
    },
    {
      name: "Old Man",
      id: "entrance-dm-old-man",
      type: "entrance",
      xy: [1840, 960],
    },
    {
      name: "Whatever cave, I just... WHATEVER",
      id: "entrance-dm-whatever-cave",
      type: "entrance",
      xy: [2192, 672],
    },
    {
      name: "'Can't bother finding its name' Cave, Dropdown",
      id: "entrance-dm-noidea-cave-dropdown",
      type: "entrance",
      xy: [1872, 576],
    },
    {
      name: "Spectacle Rock",
      id: "entrance-dm-spectacle-rock",
      type: "entrance",
      xy: [2000, 432],
    },
    {
      name: "Spectacle Rock, Dropdown",
      id: "entrance-dm-spectacle-rock-dropdown",
      type: "entrance",
      xy: [2000, 608],
    },
    {
      name: "Tower of Hera",
      id: "entrance-dm-toh",
      type: "entrance",
      xy: [2296, 144],
    },
    {
      name: "Paradox Cave, Top",
      id: "entrance-dm-paradox-cave-top",
      type: "entrance",
      xy: [3520, 272],
    },
    {
      name: "Mimic Cave",
      id: "entrance-dm-mimic-cave",
      type: "entrance",
      xy: [3456, 364],
    },
    {
      name: "Spiral Cave, Top",
      id: "entrance-dm-spiral-cave-top",
      type: "entrance",
      xy: [3264, 384],
    },
    {
      name: '"I don\'t even" Cave',
      id: "entrance-dm-idonteven-cave",
      type: "entrance",
      xy: [3360, 480],
    },
    {
      name: "Spiral Cave, Bottom",
      id: "entrance-dm-spiral-cave-bot",
      type: "entrance",
      xy: [3280, 544],
    },
    {
      name: "Hookshot Fairy Cave",
      id: "entrance-dm-hookshot-fairy-cave",
      type: "entrance",
      xy: [3360, 576],
    },
    {
      name: '"WHAT IS THIS?" Cave',
      id: "entrance-dm-whatisthis-cave",
      type: "entrance",
      xy: [3456, 608],
    },
    {
      name: "Paradox Cave, Bottom",
      id: "entrance-dm-paradox-cave-bot",
      type: "entrance",
      xy: [3504, 608],
    },
    {
      name: "Paradoc Cave, Middle",
      id: "entrance-dm-paradox-cave-mid",
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
      name: "Dark World Lumberjack",
      id: "entrance-dw-north-lumberjack",
      type: "entrance",
      xy: [5472, 240],
    },
    {
      name: "Bumper Cave, Ledge",
      id: "entrance-dw-north-bumper-cave-ledge",
      type: "entrance",
      xy: [5568, 640],
    },
    {
      name: "Bumper Cave",
      id: "entrance-dw-north-bumper-cave-bot",
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
      name: "Dark World Sanctuary",
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
      name: "Fortune Teller",
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
      name: "C House",
      id: "entrance-dw-vo-c-house",
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
      name: "Hammer Pegs Cave",
      id: "entrance-dw-vo-hammer-pegs-cave",
      type: "entrance",
      xy: [5392, 2496],
    },
    {
      name: "Arrow Game",
      id: "entrance-dw-vo-arrow-game",
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
      name: "Bomb Shop",
      id: "entrance-dw-mid-bomb-shop",
      type: "entrance",
      xy: [6336, 2832],
    },

    // Dark world dam area
    {
      name: "Hype Cave",
      id: "entrance-dw-dam-hype-cave",
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
      name: "Dark Icerod Cave, Left",
      id: "entrance-dw-lake-icerod-cave-left",
      type: "entrance",
      xy: [7760, 3168],
    },
    {
      name: "Dark Icerod Cave, Right",
      id: "entrance-dw-lake-icerod-cave-right",
      type: "entrance",
      xy: [7840, 3168],
    },
    {
      name: "Dark Icerod Boulder Cave",
      id: "entrance-dw-lake-icerod-boulder-cave",
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
      name: "Cave (?)",
      id: "entrance-dw-mm-cave",
      type: "entrance",
      xy: [4912, 3392],
    },
    {
      name: "Fairy Cave",
      id: "entrance-dw-mm-fairy",
      type: "entrance",
      xy: [4544, 3280],
    },
    {
      name: "Mire Shed",
      id: "entrance-dw-mm-shed",
      type: "entrance",
      xy: [4256, 3280],
    },
    {
      name: "Misery Mire",
      id: "entrance-dw-mm-misery-mire",
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
      name: "Hookshot Cave, Floating Isle",
      id: "entrance-dw-dm-hookshot-cave-floating-isle",
      type: "entrance",
      xy: [7376, 80],
    },
    {
      name: "Hookshot Cave, Right",
      id: "entrance-dw-dm-hookshot-cave-right",
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
      name: "Turtle Rock, Left",
      id: "entrance-dw-dm-turtle-rock-left",
      type: "entrance",
      xy: [7360, 384],
    },
    {
      name: "Turtle Rock, Right",
      id: "entrance-dw-dm-turtle-rock-right",
      type: "entrance",
      xy: [7552, 384],
    },
    {
      name: "Turtle Rock, Laser Bridge",
      id: "entrance-dw-dm-turtle-rock-laser-bridge",
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
