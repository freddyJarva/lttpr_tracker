import type { Writable } from "svelte/store";

export interface MarkerData {
  name: string;
  id: string;
  type: string;
  xy: Array<number>;
  popup?: any;
}

export interface InteractiveMarker {
  data: MarkerData;
  node: L.Marker;
  isActive: boolean;
  notes?: Writable<string>;
}

export function isInteractiveMarker(
  marker: InteractiveMarker | MarkerData
): marker is InteractiveMarker {
  return (marker as InteractiveMarker).isActive !== undefined;
}
