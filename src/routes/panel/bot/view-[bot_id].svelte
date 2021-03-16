<script lang="ts" context="module">
	import updateBotStore from "./_update_bot_store";
	export const preload = updateBotStore;
</script>

<script lang="ts">
	import { botStore } from "../../_stores";
</script>

<div class="main">
	<!-- TODO -->
	<h2>TODO</h2>
</div>

<style lang="scss">
	.panel {
		display: flex;
		height: 100%;
		flex-grow: 1;
	}
	:global(aside) {
		height: auto !important;
	}
	.main {
		width: 100%;
	}
</style>
