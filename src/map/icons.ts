import L from "leaflet";
import { InteractiveMarker, isInteractiveMarker, MarkerData } from "./markers";

const mapIcons = {
  entrance: L.icon({
    iconUrl: "icons/map-marker-entrance.svg",
    iconSize: [12, 26], // size of the icon
    iconAnchor: [6, 26], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -26], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, -13],
  }),

  glitch: L.icon({
    iconUrl: "icons/map-marker-glitch-improved.svg",

    iconSize: [40, 30],
    iconAnchor: [20, 30],
    popupAnchor: [0, -32],
    tooltipAnchor: [14, -15],
  }),
  default: new L.Icon.Default(),
};

export interface IconData extends L.IconOptions {
  name?: string;
}

const HYRULE_CASTLE = {
  iconSize: [22, 26],
};

const DESERT_PALACE = {
  iconSize: [30, 30],
};

const TURTLE_ROCK = {
  iconSize: [32, 27],
};

function iconData(url: string, data: any): IconData {
  // Sensible defaults derived from iconSize
  if (!data.iconAnchor) {
    data.iconAnchor = [Math.floor(data.iconSize[0] / 2), data.iconSize[1]];
  }
  if (!data.popupAnchor) {
    data.popupAnchor = [0, data.iconSize[1] * -1];
  }
  if (!data.tooltipAnchor) {
    data.tooltipAnchor = [12, Math.floor(data.iconSize[1] / 2) * -1];
  }
  return { iconUrl: url, ...data };
}

export const iconDataList: Array<IconData> = [
  iconData("icons/map-marker-hyrulecastle-w.webp", HYRULE_CASTLE),
  iconData("icons/map-marker-hyrulecastle-m.webp", HYRULE_CASTLE),
  iconData("icons/map-marker-hyrulecastle-e.webp", HYRULE_CASTLE),
  iconData("icons/map-marker-easternpalace.webp", { iconSize: [24, 24] }),
  iconData("icons/map-marker-desertpalace-w.webp", DESERT_PALACE),
  iconData("icons/map-marker-desertpalace-m.webp", DESERT_PALACE),
  iconData("icons/map-marker-desertpalace-e.webp", DESERT_PALACE),
  iconData("icons/map-marker-desertpalace-b.webp", DESERT_PALACE),
  iconData("icons/map-marker-castletower.webp", { iconSize: [26, 26] }),
  iconData("icons/map-marker-towerofhera.webp", { iconSize: [26, 26] }),
  iconData("icons/map-marker-palaceofdarkness.webp", { iconSize: [30, 30] }),
  iconData("icons/map-marker-swamppalace.webp", { iconSize: [30, 30] }),
  iconData("icons/map-marker-skullwoods.webp", { iconSize: [30, 30] }),
  iconData("icons/map-marker-thievestown.webp", { iconSize: [30, 30] }),
  iconData("icons/map-marker-icepalace.webp", { iconSize: [30, 30] }),
  iconData("icons/map-marker-miserymire.webp", { iconSize: [30, 30] }),
  iconData("icons/map-marker-turtlerock-w.svg", TURTLE_ROCK),
  iconData("icons/map-marker-turtlerock-m.svg", TURTLE_ROCK),
  iconData("icons/map-marker-turtlerock-e.svg", TURTLE_ROCK),
  iconData("icons/map-marker-turtlerock-b.svg", TURTLE_ROCK),
  iconData("icons/map-marker-ganonstower.webp", { iconSize: [25, 25] }),
  iconData("icons/map-marker-ganon.webp", { iconSize: [39, 27] }),
  // Special locationa
  iconData("images/npc/sahasrahla.webp", { iconSize: [16, 24] }),
  iconData("images/npc/aginah.webp", { iconSize: [16, 25] }),
  iconData("images/npc/sick-kid.webp", { iconSize: [24, 30] }),
  iconData("images/npc/smith.webp", { iconSize: [24, 25] }),
  iconData("images/npc/blind.webp", { iconSize: [16, 25] }),
  iconData("images/npc/magic-shop.webp", { iconSize: [16, 25] }),
  iconData("images/npc/lumberjack.webp", { iconSize: [20, 28] }),
  iconData("images/npc/old-man.webp", { iconSize: [16, 21] }),
  iconData("images/npc/priest.webp", { iconSize: [18, 24] }),
  iconData("images/npc/bombshop.webp", { iconSize: [14, 16] }),
  iconData("images/npc/mad-batter.webp", { iconSize: [16, 16] }),
  iconData("icons/map-marker-mimic-cave.webp", { iconSize: [28, 29] }),
  iconData("icons/map-marker-dam.webp", { iconSize: [16, 24] }),
  iconData("icons/map-marker-spike-cave.svg", { iconSize: [20, 20] }),
  // other
  iconData("icons/map-marker-connector.svg", { iconSize: [24, 24] }),
  iconData("icons/map-marker-no-entry.svg", { iconSize: [16, 16] }),
  iconData("icons/map-marker-chest.svg", { iconSize: [20, 20] }),
  iconData("icons/map-marker-entrance.svg", { iconSize: [12, 26] }),
];

export function iconFor(marker: InteractiveMarker | MarkerData): L.Icon {
  if (isInteractiveMarker(marker)) {
    marker = marker.data;
  }
  return mapIcons[marker.type] === undefined
    ? mapIcons.default
    : mapIcons[marker.type];
}
