import { writable, Writable, get } from "svelte/store";

import _ from "lodash";

const dungeonImgSubstrings = [
  "zelda",
  "armos",
  "lanmolas",
  "aghanim",
  "moldorm",
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

  interiorType(): string;
}

export class MapObject implements MapComponentObject {
  entranceName: string;
  entranceId: string;
  img: Writable<string>;
  text: Writable<string>;

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
  }

  interiorType(): string {
    // Interior meaning the location this overworld entrance takes you to
    if (
      _.filter(dungeonImgSubstrings, (substr) => get(this.img).includes(substr))
        .length > 0
    ) {
      return "dungeon";
    } else {
      return "other";
    }
  }
}

export const mapComponentObjects: Writable<Array<MapObject>> = writable([]);
