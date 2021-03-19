import App from "./App.svelte";
import Qusb2SnesOutput from "./Qusb2SnesOutput.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
