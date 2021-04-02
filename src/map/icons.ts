import L from "leaflet";

export const mapIcons = {
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
