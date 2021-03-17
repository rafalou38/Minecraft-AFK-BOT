<script lang="ts" context="module">
	import updateBotStore from "./_update_bot_store";
	export const preload = updateBotStore;
</script>

<script lang="ts">
	import Button, { Label } from "@smui/button";
	import Textfield from "@smui/textfield";

	import type { IBot } from "../../../models/bot-model";
	import { botStore } from "../../_stores";

	let initial_bot: any;
	$: if (botStore.get() && !initial_bot) {
		initial_bot = { ...botStore.get() };
	}
	async function confirmExit(objectif: string) {
		if (
			!(
				JSON.stringify({ ...initial_bot }) ==
				JSON.stringify({ ...botStore.get() })
			)
		) {
			// TODO  Use smui dialog
			return confirm("you didnt saved, are you sure? 😙");
		}
		return true;
	}

	async function save() {
		if (
			JSON.stringify({ ...initial_bot }) !=
			JSON.stringify({ ...botStore.get() })
		) {
			// TODO handle error
			const response = await fetch(`panel/bot/`, {
				method: "PUT",
				body: JSON.stringify(botStore.get()),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status === 200) {
				initial_bot = { ...botStore.get() };
			}
		}
	}
</script>

<div class="form">
	<h2>Settings</h2>
	<Textfield
		variant="outlined"
		bind:value={$botStore.name}
		label="Name"
		style="width: 100%;"
	/>

	<Textfield
		variant="outlined"
		bind:value={$botStore.ip}
		label="IP"
		style="width: 100%;"
	/>

	<Textfield
		variant="outlined"
		bind:value={$botStore.username}
		label="Username"
		style="width: 100%;"
	/>

	<Textfield
		variant="outlined"
		bind:value={$botStore.username}
		label="Password"
		style="width: 100%;"
	/>
	<Button
		variant="raised"
		style="
					width: 100%;
				"
		disabled={JSON.stringify({ ...initial_bot }) ==
			JSON.stringify({ ...$botStore })}
		on:click={save}><Label>Save</Label></Button
	>
</div>

<style lang="scss">
	:global(aside) {
		height: auto !important;
	}
	.form {
		margin: 0 auto;
		padding-top: 2em;

		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 1em;

		width: 40%;
		min-width: 20em;
		max-width: 30em;
	}
</style>
