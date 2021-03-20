import { writable } from "svelte/store";

// used for manual testing/debugging
// By replacing createBinaryItem/createProgressive etc. in items.js
function createTestItem(hexOffset, hexMask) {
  const { subscribe, set } = writable(0);

  return {
    subscribe,
    updateFromQUsbData: (qusbData) => {
      console.log(
        `data at hexoffset: ${
          qusbData[hexOffset]
        }\nhexmask: ${hexMask}\noffset & mask: ${qusbData[hexOffset] & hexMask}`
      );
    },
    reset: () => set(0),
  };
}
