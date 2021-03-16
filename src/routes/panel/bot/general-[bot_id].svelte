<script lang="ts" context="module">
	import updateBotStore from "./_update_bot_store";
	export const preload = updateBotStore;
</script>

<script lang="ts">
	import { botStore } from "../../_stores";
</script>

<pre>{JSON.stringify($botStore, null, 2)}</pre>
<div class="main">
	<ul>
		<li>position: {$botStore.position}</li>
		<li>ip: {$botStore.ip}</li>
		<li>username: {$botStore.username}</li>
		<li>health: {$botStore.health}</li>
		<li>
			status: <span style="color: {$botStore.status?.color}"
				>{$botStore.status?.label}</span
			>
		</li>
	</ul>
</div>

<style>
	:global(aside) {
		height: auto !important;
	}
	.main {
		width: 100%;
	}
</style>
