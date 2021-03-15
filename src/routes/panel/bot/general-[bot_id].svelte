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
	import type { IBot } from "../../../models/bot-model";
	import Sidebar from "../../../components/panel/sidebar.svelte";

	export let bot: IBot;
</script>

<div class="panel">
	<Sidebar {bot} />

	<div class="main">
		<ul>
			<li>position: {bot.position}</li>
			<li>ip: {bot.ip}</li>
			<li>username: {bot.username}</li>
			<li>health: {bot.health}</li>
			<li>
				status: <span style="color: {bot.status.color}"
					>{bot.status.label}</span
				>
			</li>
		</ul>
	</div>
</div>

<style>
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
