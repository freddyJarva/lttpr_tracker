import { writable, Writable, Readable, derived, get } from "svelte/store";

import _ from "lodash";

const dungeonImgSubstrings = [
  "hyrulecastle",
  "easternpalace",
  "desertpalace",
  "towerofhera",
  "castletower",
  "palaceofdarkness",
  "swamppalace",
  "skullwoods",
  "thievestown",
  "icepalace",
  "miserymire",
  "turtlerock",
  "ganonstower",
];

export interface MapComponentObject {
  entranceName?: string;
  entranceId?: string;
  img?: Writable<string>;
  text: Writable<string>;
  interiorId?: Readable<number>;
}

export class MapObject implements MapComponentObject {
  entranceName?: string;
  entranceId?: string;
  img?: Writable<string>;
  text: Writable<string>;
  interiorId?: Readable<number>;

  constructor(entranceName: string, entranceId: string, initialText?: string) {
    this.entranceName = entranceName;
    this.entranceId = entranceId;
    this.img = writable("");
    this.text = writable(initialText ? initialText : "");
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
