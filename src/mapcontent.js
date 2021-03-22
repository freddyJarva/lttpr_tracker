const overworldLight = "images/overworld-light.png";
const overworldDark = "images/overworld-dark.png";

// Used as reference when translating points to resized maps
export const originalSize = 2048;
export const referenceSize = 250;

const maps = [
  {
    world: "light",
    image: overworldLight,
    entrances: [
      {
        name: "link's house",
        id: "house-link",
        x: 134,
        y: 170,
      },
    ],
    items: [
      {
        name: "race game reward",
        id: "item-racegame",
        x: 12,
        y: 170,
      },
    ]
  },
  {
    world: "dark",
    image: overworldDark,
    entrances: [],
    items: [],
  },
];

export default maps;
