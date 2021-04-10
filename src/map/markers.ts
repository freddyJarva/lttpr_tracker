import L, { LatLngExpression } from "leaflet";
import type { Writable } from "svelte/store";

export interface CustomMarkerOptions extends L.MarkerOptions {
  className?: string;
  id?: string;
}
export class CustomMarker extends L.Marker {
  options: CustomMarkerOptions;

  constructor(latLng: LatLngExpression, options?: CustomMarkerOptions) {
    super(latLng, options);

    return this;
  }

  onAdd(map: L.Map) {
    L.Marker.prototype.onAdd.call(this, map);

    if (this.options.className) {
      L.DomUtil.addClass(this.getElement(), this.options.className);
    }
    if (this.options.id) {
      this.getElement().id = this.options.id;
    }
    return this;
  }
}

export interface MarkerData {
  name: string;
  id: string;
  type: string;
  xy: Array<number>;
  popup?: any;
}

export interface InteractiveMarker {
  data: MarkerData;
  node: CustomMarker;
  isActive: boolean;
  notes?: Writable<string>;
}

export function isInteractiveMarker(
  marker: InteractiveMarker | MarkerData
): marker is InteractiveMarker {
  return (marker as InteractiveMarker).isActive !== undefined;
}
