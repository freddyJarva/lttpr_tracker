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

const ZELDA = {
  iconSize: [24, 26],
};

const LANMOLAS = {
  iconSize: [28, 41],
  iconAnchor: [10, 38],
  popupAnchor: [0, -38],
};

const TRINEXX = {
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
  iconData("icons/map-marker-zelda-m.webp", ZELDA),
  iconData("icons/map-marker-zelda-w.webp", ZELDA),
  iconData("icons/map-marker-zelda-e.webp", ZELDA),
  iconData("images/boss/armos.png", { iconSize: [32, 32] }),
  iconData("icons/map-marker-lanmolas-m.webp", LANMOLAS),
  iconData("icons/map-marker-lanmolas-e.webp", LANMOLAS),
  iconData("icons/map-marker-lanmolas-w.webp", LANMOLAS),
  iconData("icons/map-marker-lanmolas-b.webp", LANMOLAS),
  iconData("images/boss/moldorm.png", { iconSize: [34, 30] }),
  iconData("images/boss/helmasaur.png", { iconSize: [32, 32] }),
  iconData("images/boss/arrghus.png", { iconSize: [30, 29] }),
  iconData("images/boss/mothula.png", { iconSize: [30, 32] }),
  iconData("images/boss/blind.png", { iconSize: [26, 19] }),
  iconData("images/boss/kholdstare.png", { iconSize: [32, 32] }),
  iconData("images/boss/vitreous.png", { iconSize: [32, 34] }),
  iconData("icons/map-marker-trinexx-m.webp", TRINEXX),
  iconData("icons/map-marker-trinexx-w.webp", TRINEXX),
  iconData("icons/map-marker-trinexx-e.webp", TRINEXX),
  iconData("icons/map-marker-trinexx-b.webp", TRINEXX),
  iconData("images/boss/aghanim.png", { iconSize: [30, 32] }),
  iconData("images/boss/ganon.png", { iconSize: [39, 27] }),
  // Special locationa
  iconData("images/npc/sahasrahla.png", { iconSize: [16, 24] }),
  iconData("images/npc/aginah.png", { iconSize: [16, 25] }),
  iconData("images/npc/sick-kid.png", { iconSize: [24, 30] }),
  iconData("images/npc/smith.png", { iconSize: [24, 25] }),
  iconData("images/npc/blind.png", { iconSize: [16, 25] }),
  iconData("images/npc/magic-shop.png", { iconSize: [16, 25] }),
  iconData("images/npc/lumberjack.png", { iconSize: [20, 28] }),
  iconData("images/npc/old-man.png", { iconSize: [16, 21] }),
  iconData("images/npc/priest.png", { iconSize: [18, 24] }),
  iconData("images/npc/bombshop.png", { iconSize: [14, 16] }),
  iconData("images/npc/mad-batter.png", { iconSize: [16, 16] }),
  iconData("icons/map-marker-mimic-cave.png", { iconSize: [28, 29] }),
  iconData("icons/map-marker-dam.png", { iconSize: [16, 24] }),
  iconData("icons/map-marker-spike-cave.svg", { iconSize: [20, 20] }),
  // other
  iconData("icons/map-marker-connector.svg", { iconSize: [24, 24] }),
  iconData("icons/map-marker-no-entry.svg", { iconSize: [16, 16] }),
  iconData("icons/map-marker-chest.svg", { iconSize: [20, 20] }),
];

export function iconFor(marker: InteractiveMarker | MarkerData): L.Icon {
  if (isInteractiveMarker(marker)) {
    marker = marker.data;
  }
  return mapIcons[marker.type] === undefined
    ? mapIcons.default
    : mapIcons[marker.type];
}
