import { writable, Writable } from "svelte/store";

export interface MapComponentObject {
  entranceName: string;
  img: Writable<string>;
  noteText: Writable<string>;
}

export const mapComponentObjects: Writable<
  Array<MapComponentObject>
> = writable([]);
