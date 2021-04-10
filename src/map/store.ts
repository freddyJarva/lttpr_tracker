import { writable, Writable } from "svelte/store";

export interface MapComponentObject {
  entranceName: string;
  entranceId: string;
  img: Writable<string>;
  text: Writable<string>;
}

export const mapComponentObjects: Writable<
  Array<MapComponentObject>
> = writable([]);
