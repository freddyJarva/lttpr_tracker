import type { LatLng } from "leaflet";

export interface LatLngPoint {
  latlng: LatLng;
}

export function isLeafletPoint(p: LatLngPoint | any): p is LatLngPoint {
  return (p as LatLngPoint).latlng !== undefined;
}
