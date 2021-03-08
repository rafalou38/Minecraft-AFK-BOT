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
	import Button, { Label } from "@smui/button";
	import IconButton, { Icon } from "@smui/icon-button";

	import Sidebar from "../../../components/panel/sidebar.svelte";
	import Action from "../../../components/panel/action.svelte";

	import type { IBot } from "../../../models/bot-model";

	export let bot: IBot;
	let initial_bot: any;
	$: if (bot && !initial_bot) {
		initial_bot = { ...bot };
	}
	async function confirmExit(objectif: string) {
		if (
			!(JSON.stringify({ ...initial_bot }) == JSON.stringify({ ...bot }))
		) {
			// TODO  Use smui dialog
			return confirm("you didnt saved, are you sure? 😙");
		}
		return true;
	}

	async function save() {
		// TODO handle error
		const response = await fetch(`panel/bot/`, {
			method: "PUT",
			body: JSON.stringify(bot),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {
			initial_bot = { ...bot };
		}
	}
	async function delete_action(e) {
		(bot.actions as any) = bot.actions.filter(
			(action) => action.id != e.detail
		);
	}
	async function add_action() {}
</script>

<div class="panel">
	<Sidebar {bot} confirm={confirmExit} />

	<div class="main">
		<div class="form">
			<h2>Actions</h2>
			<ol>
				{#each bot.actions || [] as action (action.id)}
					<li>
						<Action on:delete={delete_action} {action} />
					</li>
				{/each}
			</ol>
			<div class="add">
				<IconButton class="material-icons add">add</IconButton>
			</div>
			<Button
				variant="raised"
				style="
					width: 100%;
				"
				disabled={JSON.stringify({ ...initial_bot }) ==
					JSON.stringify({ ...bot })}
				on:click={save}><Label>Save</Label></Button
			>
		</div>
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
	.form {
		margin: 0 auto;
		padding-top: 2em;

		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 1em;

		width: 60%;
		height: 100%;
		min-width: 20em;
		max-width: 50em;
		ol {
			padding: 0;
			width: 100%;
			li {
				padding-left: 5px;
				&::marker {
					font-weight: bold;
					color: rgba(0, 0, 0, 0.75);
				}
			}
		}
	}
</style>
