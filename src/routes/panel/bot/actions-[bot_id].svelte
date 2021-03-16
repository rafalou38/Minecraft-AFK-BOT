<script lang="ts" context="module">
	import updateBotStore from "./_update_bot_store";
	export const preload = updateBotStore;
</script>

<script lang="ts">
	import Button, { Label } from "@smui/button";
	import IconButton, { Icon } from "@smui/icon-button";

	import Action from "../../../components/panel/action.svelte";

	import type { IBot } from "../../../models/bot-model";
	import { botStore } from "../../_stores";

	let initial_bot: any;
	async function confirmExit(objectif: string) {
		if (!(initial_bot == JSON.stringify({ ...botStore.get() }))) {
			// TODO  Use smui dialog
			return confirm("you didnt saved, are you sure? 😙");
		}
		return true;
	}

	async function save() {
		// TODO handle error
		const response = await fetch(`panel/bot/`, {
			method: "PUT",
			body: JSON.stringify(botStore.get()),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {
			botStore.set(await response.json());
			initial_bot = JSON.stringify(botStore.get());
			update();
		}
	}
	async function delete_action(e) {
		(botStore.get().actions as any) = botStore
			.get()
			.actions.filter((action) => action.id != e.detail);
	}
	async function add_action() {
		console.log("created action");
		botStore.update((bot) => {
			bot.actions = [
				...bot.actions,
				{
					id: uniqueID(),
					type: null,
					params: {},
				},
			];
			return bot;
		});
	}

	import { flip } from "svelte/animate";
	import { dndzone } from "svelte-dnd-action";
	import { uniqueID } from "../../../helpers";
	import { action_destroyer } from "svelte/internal";
	const flipDurationMs = 300;

	function handleDndConsider(e) {
		$botStore.actions = e.detail.items;
	}
	function handleDndFinalize(e) {
		$botStore.actions = e.detail.items;
	}
	let disabled = false;
	$: update();
	function update() {
		if (botStore.get() && !initial_bot) {
			initial_bot = JSON.stringify(botStore.get());
		}
		disabled = initial_bot == JSON.stringify({ ...botStore.get() });
	}
</script>

<div class="main">
	<div class="form">
		<h2>Actions</h2>
		<!-- TODO: https://svelte.dev/repl/4949485c5a8f46e7bdbeb73ed565a9c7?version=3.24.1 handles -->
		<ol
			use:dndzone={{
				items: $botStore.actions,
				flipDurationMs,
				dropTargetStyle: { "background-color": "#00000010" },
			}}
			on:consider={handleDndConsider}
			on:finalize={handleDndFinalize}
		>
			{#each $botStore.actions || [] as action (action.id)}
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
		<Button variant="raised" style="
					width: 100%;
				" {disabled} on:click={save}
			><Label>Save</Label></Button
		>
		<small>fields marked with <strong>"*"</strong> are required</small>
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
