<script lang="ts">
	import BotCard from "../../components/panel/bot-card.svelte";
	import AddCard from "../../components/panel/add-card.svelte";

	const bots = [
		{
			name: "roganarafa",
			ip: "roganarafa.aternos.me",
			id: "dgdgjdjgooitjhpikfgokjo",
			username: "piggy",
			health: 142,
			position: "-455 25 453",
			status: {
				color: "purple",
				label: "broken",
			},
		},
		{
			name: "GamescraftDP",
			ip: "GamescraftDP.aternos.me",
			id: "djvksdfsugbkdigpqseoiugtd",
			username: "rafalou38",
			health: 7,
			position: "-120 45 693",
			status: {
				color: "green",
				label: "connected",
			},
		},
		{
			name: "rafaelolo",
			ip: "rafaelolo.aternos.me",
			id: "djfijgifdjthoudperhiàrhif",
			username: "mario",
			health: 5,
			position: "-364 71 203",
			status: {
				color: "red",
				label: "crashed",
			},
		},
	];
</script>

<h1>Select a BOT</h1>

<div class="bots-container">
	{#if bots.length <= 2}
		<AddCard />
	{/if}
	{#each bots as bot}
		<BotCard {bot} />
	{/each}
</div>

<div class="floating-count">{bots.length} / 3</div>

<style>
	h1 {
		margin-top: 20px;
		color: #adadad;
		font-weight: bold;
		font-size: 2.5em;
	}
	.bots-container {
		display: flex;
		padding: 50px;
		flex-wrap: wrap;
		justify-content: center;
	}
	.floating-count {
		position: fixed;
		margin: 20px;
		right: 0;
		bottom: 0;
		font-size: 2em;
		font-weight: 900;
		color: #adadad;
	}
</style>
