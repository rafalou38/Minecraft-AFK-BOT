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
	async function confirmExit(objectif: string) {
		if (!(initial_bot == JSON.stringify({ ...bot }))) {
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
			bot = await response.json();
			initial_bot = JSON.stringify(bot);
			update();
		}
	}
	async function delete_action(e) {
		(bot.actions as any) = bot.actions.filter(
			(action) => action.id != e.detail
		);
	}
	async function add_action() {
		console.log("created action");
		bot.actions = [
			...bot.actions,
			{
				id: uniqueID(),
				type: null,
				params: {},
			},
		];
		bot.actions.push();
	}

	import { flip } from "svelte/animate";
	import { dndzone } from "svelte-dnd-action";
	import { uniqueID } from "../../../helpers";
	import { action_destroyer } from "svelte/internal";
	const flipDurationMs = 300;

	function handleDndConsider(e) {
		bot.actions = e.detail.items;
	}
	function handleDndFinalize(e) {
		bot.actions = e.detail.items;
	}
	let disabled = false;
	$: update();
	function update() {
		if (bot && !initial_bot) {
			initial_bot = JSON.stringify(bot);
		}
		disabled = initial_bot == JSON.stringify({ ...bot });
	}
</script>

<div class="panel">
	<Sidebar {bot} confirm={confirmExit} />

	<div class="main">
		<div class="form">
			<h2>Actions</h2>
			<!-- TODO: https://svelte.dev/repl/4949485c5a8f46e7bdbeb73ed565a9c7?version=3.24.1 handles -->
			<ol
				use:dndzone={{
					items: bot.actions,
					flipDurationMs,
					dropTargetStyle: { "background-color": "#00000010" },
				}}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each bot.actions || [] as action (action.id)}
					<li animate:flip={{ duration: flipDurationMs }}>
						<Action on:delete={delete_action} {action} {update} />
					</li>
				{/each}
			</ol>
			<div class="add">
				<IconButton class="material-icons add" on:click={add_action}
					>add</IconButton
				>
			</div>
			<Button
				variant="raised"
				style="
					width: 100%;
				"
				{disabled}
				on:click={save}><Label>Save</Label></Button
			>
			<small>fields marked with <strong>"*"</strong> are required</small>
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
