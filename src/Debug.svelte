<script>
  import { mouseX, mouseY } from "./map/store";

  const DEBUG = __tracker.env.debug;
</script>

{#if DEBUG}
  <p>X Y: {$mouseX}, {$mouseY}</p>
{/if}
