let currentColorIdx = 0;
let colors = ["#F00", "#0F0", "#00F", "#FF0", "#F0F", "#0FF"];

export function lineColor(): string {
  let chosen = colors[currentColorIdx];
  currentColorIdx = (currentColorIdx + 1) % colors.length;
  return chosen;
}
