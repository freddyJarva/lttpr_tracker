import L, { Icon } from "leaflet";
import { InteractiveMarker, isInteractiveMarker, MarkerData } from "./markers";

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

export interface IconData extends L.IconOptions {
  name?: string;
}

export const iconDataList: Array<IconData> = [
  {
    iconUrl: "icons/map-marker-door-green.svg",
    shadowUrl: "icons/map-marker-shadow.svg",

    iconSize: [20, 30],
    shadowSize: [20, 30],
    iconAnchor: [10, 30],
    popupAnchor: [0, -32],
    tooltipAnchor: [12, -20],
    shadowAnchor: [1, 22],
    name: "default",
  },
  {
    iconUrl: "images/boss/armos.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "armos",
  },
  {
    iconUrl: "images/boss/lanmolas.png",
    iconSize: [73, 22],
    iconAnchor: [36, 22],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "lanmolas",
  },
  {
    iconUrl: "images/boss/moldorm.png",
    iconSize: [34, 30],
    iconAnchor: [16, 30],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "moldorm",
  },
  {
    iconUrl: "images/boss/helmasaur.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "helmasaur",
  },
  {
    iconUrl: "images/boss/arrghus.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "arrghus",
  },
  {
    iconUrl: "images/boss/mothula.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "mothula",
  },
  {
    iconUrl: "images/boss/blind.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "blind",
  },
  {
    iconUrl: "images/boss/kholdstare.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "kholdstare",
  },
  {
    iconUrl: "images/boss/vitreous.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "vitreous",
  },
  {
    iconUrl: "images/boss/trinexx.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "trinexx",
  },
  {
    iconUrl: "images/boss/aghanim.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "aghanim",
  },
  {
    iconUrl: "images/boss/ganon.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    tooltipAnchor: [16, -16],
    name: "ganon",
  },
];

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
