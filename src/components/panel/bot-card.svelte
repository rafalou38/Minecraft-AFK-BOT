<script lang="ts">
	import Ripple from "@smui/ripple";
	export let bot = {
		name: "",
		ip: "",
		id: "",
		username: "",
		health: 0,
		position: "",
		status: {
			color: "grey",
			label: "",
		},
	};
</script>

<a href="/panel/bot/{bot.id}">
	<div class="card" use:Ripple={{ ripple: true, color: "surface" }}>
		<h3 class="primary">{bot.name}</h3>
		<p class="secondary">{bot.ip}</p>
		<p class="secondary" title={bot.status.label}>
			<span class="dot" style="background-color: {bot.status.color}" />
			{bot.username}
		</p>

		<img
			class="avatar"
			src="https://mc-heads.net/avatar/{bot.username}"
			alt="{bot.username}'s head"
		/>

		<div class="hearts">
			<span
				class="iconify heart"
				data-icon={bot.health >= 1 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 2 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 3 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 4 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 5 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 6 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 7 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 8 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 9 ? "mdi:heart" : "mdi:heart-outline"}
			/><span
				class="iconify heart"
				data-icon={bot.health >= 10 ? "mdi:heart" : "mdi:heart-outline"}
			/>
			<span>
				{bot.health}/10
			</span>
		</div>
		<p class="primary">
			position: <span class="secondary">{bot.position}</span>
		</p>
	</div>
</a>

<style lang="scss">
	a {
		display: contents;
	}
	.card {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;

		width: 300px;
		height: 300px;

		background: #e9e9e9;
		border-radius: 10px;

		font-family: "Roboto", Arial, Helvetica, sans-serif;
		font-weight: 500;
		text-align: center;

		margin: 20px;
		line-height: 1;
		h3 {
			font-size: 40px;
			font-weight: bold;
			margin-top: 10px;
			margin-bottom: 0;
		}
		p {
			font-weight: 500;
			font-size: 20px;
			margin: 0;
		}
		.dot {
			width: 10px;
			height: 10px;
			border-radius: 5px;
			margin-right: 5px;
			display: inline-block;
			filter: opacity(90);
		}
		.avatar {
			width: 100px;
			height: 100px;
			background-color: #c0c0c0;
			text-align: center;
		}
		.hearts {
			margin-top: 5px;
			font-size: 14px;
			.heart {
				color: red;
			}
		}
		.primary {
			color: #888;
		}
		.secondary {
			color: #aaa;
		}
	}
</style>
