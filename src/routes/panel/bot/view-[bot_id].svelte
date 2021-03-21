<script lang="ts" context="module">
  import updateBotStore from "./_update_bot_store";
  export const preload = updateBotStore;
</script>

<script lang="ts">
  import { botStore } from "../../_stores";
</script>

<!-- TODO -->
<h2>TODO</h2>

<style lang="scss">
  :global(aside) {
    height: auto !important;
  }
</style>
