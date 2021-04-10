import * as L from "leaflet";
let currentColorIdx = 0;
let colors = ["#F00", "#0F0", "#00F", "#FF0", "#F0F", "#0FF"];

export function lineColor(): string {
  let chosen = colors[currentColorIdx];
  currentColorIdx = (currentColorIdx + 1) % colors.length;
  return chosen;
}

export function createLine(point1: L.LatLng, point2: L.LatLng): L.Polyline {
  return L.polyline([point1, point2], {
    color: lineColor(),
    opacity: 0.8,
    weight: 6,
  });
}

export function lineBetween(m1: L.Marker | L.LatLng, m2: L.Marker | L.LatLng) {
  let point1 = m1 instanceof L.Marker ? m1.getLatLng() : m1;
  let point2 = m2 instanceof L.Marker ? m2.getLatLng() : m2;
  return createLine(point1, point2);
}