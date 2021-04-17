import { writable, Writable, Readable, derived, get } from "svelte/store";

import _ from "lodash";

const dungeonImgSubstrings = [
  "zelda",
  "armos",
  "lanmolas",
  "moldorm",
  "aghanim",
  "helmasaur",
  "arrghus",
  "mothula",
  "blind",
  "kholdstare",
  "vitreous",
  "trinexx",
  "aghanim2",
];

export interface MapComponentObject {
  entranceName: string;
  entranceId: string;
  img: Writable<string>;
  text: Writable<string>;
  interiorId: Readable<number>;
}

export class MapObject implements MapComponentObject {
  entranceName: string;
  entranceId: string;
  img: Writable<string>;
  text: Writable<string>;
  interiorId: Readable<number>;

  constructor(
    entranceName: string,
    entranceId: string,
    img: Writable<string>,
    text: Writable<string>
  ) {
    this.entranceName = entranceName;
    this.entranceId = entranceId;
    this.img = img;
    this.text = text;
    this.interiorId = derived(this.img, ($img) => {
      for (const substr of dungeonImgSubstrings) {
        if ($img.includes(substr)) {
          return dungeonImgSubstrings.indexOf(substr) + 1;
        }
      }
      return -1;
    });
  }
}

export const mapComponentObjects: Writable<Array<MapObject>> = writable([]);
