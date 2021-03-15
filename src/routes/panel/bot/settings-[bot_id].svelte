<script lang="ts" context="module">
	export async function preload(page, session) {
		const { bot_id } = page.params;

		const bot = await (
			await this.fetch(`/panel/bot/action-${bot_id}`)
		).json();

		return { bot };
	}
</script>

<script lang="ts">
	import Sidebar from "../../../components/panel/sidebar.svelte";
	import type { IBot } from "../../../models/bot-model";

	export let bot: IBot;
</script>

<div class="panel">
	<Sidebar {bot} />

	<div class="main">
		<!-- TODO -->
		<h2>TODO</h2>
	</div>
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
