<script lang="ts" context="module">
	import updateBotStore from "./_update_bot_store";
	export const preload = updateBotStore;
</script>

<script lang="ts">
	import Button, { Label } from "@smui/button";

	import Time from "../../../components/panel/time.svelte";

	import { botStore } from "../../_stores";

	let initial_bot: any;
	let changed = false;
	$: update();
	function update() {
		if (botStore.get() && !initial_bot) {
			initial_bot = { ...botStore.get() };
		}
		changed =
			JSON.stringify({ ...initial_bot }) !=
			JSON.stringify({ ...botStore.get() });
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
				botStore.set(await response.json());
				initial_bot = { ...botStore.get() };
				update();
			}
		}
	}
</script>

<Time
	timeMilis={$botStore.endTime}
	update={(newEndTime) => {
		console.log("time was updated");

		$botStore.endTime = newEndTime;
		update();
	}}
/>

<Button variant="raised" class="save-button" disabled={!changed} on:click={save}
	><Label>Save</Label></Button
>

<pre>{$botStore.endTime}</pre>

<style lang="scss">
	:global(.save-button) {
		width: 40%;
		margin: 20px auto;
		display: block;
		max-width: 100px;
	}
</style>
