const overworldLight = "images/overworld-light.png";
const overworldDark = "images/overworld-dark.png";

// Used as reference when translating points to resized maps
export const originalSize = 2048;

const maps = [
  {
    world: "light",
    image: overworldLight,
    entrances: [
      {
        name: "link's house",
        id: "house-link",
        x: 1120,
        y: 1392,
      },
    ],
  },
  {
    world: "dark",
    image: overworldDark,
    entrances: [],
  },
];

export default maps;
