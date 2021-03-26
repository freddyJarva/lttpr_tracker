import * as L from "leaflet";

const overworldDarkLight = "images/overworld-dark-light.png";

export const doorIcon = L.icon({
  iconUrl: "icons/map-marker-door-red.svg",
  shadowUrl: "icons/map-marker-shadow.svg",

  iconSize: [30, 50], // size of the icon
  shadowSize: [30, 50], // size of the shadow
  iconAnchor: [15, 50], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  shadowAnchor: [2, 36], // the same for the shadow
});

export const defaultIcon = new L.Icon.Default();

export const mapUnit = 16;
export const imageHeight = 4096;

const mapContent = {
  image: overworldDarkLight,
  markers: [
    {
      name: "link's house",
      id: "house-link",
      type: "entrance",
      xy: [2240, 2816],
    },
    {
      name: "race game reward",
      id: "item-racegame",
      type: "item",
      xy: [128, 2880],
    },
  ],
};

export default mapContent;
