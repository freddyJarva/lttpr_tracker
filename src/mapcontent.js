const overworldDarkLight = "images/overworld-dark-light.png";

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
