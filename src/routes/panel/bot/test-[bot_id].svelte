<script lang="ts" context="module">
  import updateBotStore from "./_update_bot_store";
  export const preload = updateBotStore;
</script>

<script lang="ts">
  import { botStore } from "../../_stores";
  $: console.log("bot", $botStore);
</script>

<pre>
	{JSON.stringify($botStore)}
</pre>
