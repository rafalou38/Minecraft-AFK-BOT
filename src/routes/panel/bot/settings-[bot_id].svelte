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
	import Textfield from "@smui/textfield";
	import Snackbar, { Actions, Label as SnackbarLabel } from "@smui/snackbar";
	import IconButton from "@smui/icon-button";

	import Sidebar from "../../../components/panel/sidebar.svelte";

	import type { IBot } from "../../../models/bot-model";
	import { fetchJson } from "../../../helpers";

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

	let nothingToChangeSnackbar;
	async function save() {
		if (JSON.stringify({ ...initial_bot }) == JSON.stringify({ ...bot })) {
			nothingToChangeSnackbar.open();
		} else {
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
	}
</script>

<Snackbar bind:this={nothingToChangeSnackbar}>
	<SnackbarLabel>Nothing to save 🤨</SnackbarLabel>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>

<div class="panel">
	<Sidebar {bot} confirm={confirmExit} />

	<div class="main">
		<div class="form">
			<h2>Settings</h2>
			<Textfield
				variant="outlined"
				bind:value={bot.name}
				label="Name"
				style="width: 100%;"
			/>

			<Textfield
				variant="outlined"
				bind:value={bot.ip}
				label="IP"
				style="width: 100%;"
			/>

			<Textfield
				variant="outlined"
				bind:value={bot.username}
				label="Username"
				style="width: 100%;"
			/>

			<Textfield
				variant="outlined"
				bind:value={bot.username}
				label="Password"
				style="width: 100%;"
			/>
			<Button
				variant="raised"
				style="
					width: 100%;
					background-color: #028F01;
				"
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

		width: 40%;
		height: 100%;
		min-width: 20em;
		max-width: 30em;
	}
</style>
