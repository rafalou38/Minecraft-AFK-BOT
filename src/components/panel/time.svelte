<script lang="ts">
	import Slider from "./slider.svelte";
	import { dateDiffInHours } from "../../helpers";

	export let update: (number) => void;
	export let timeMilis: number | undefined = 0;

	let maxTime = 24;
	let date: Date | undefined;
	let endPercent: number | undefined = 0;
	let DiffInHours: number | undefined = 0;

	function getEndPercent() {
		return (DiffInHours / maxTime) * 100;
	}
	function setEndTimeFromPercent(value: number) {
		let newDiffInHours = Math.max(
			Math.min(maxTime, (value / 100) * maxTime),
			0
		);
		let newtimeMilis = new Date();
		newtimeMilis.setUTCMilliseconds(
			newtimeMilis.getUTCMilliseconds() + newDiffInHours * 60 * 60 * 1000
		);
		// console.log(timeMilis, newtimeMilis.getTime());
		timeMilis = newtimeMilis.getTime();
		update(timeMilis);
	}
	$: {
		if (timeMilis) {
			date = new Date(timeMilis);
			DiffInHours = dateDiffInHours(new Date(), date);
			endPercent = getEndPercent();
		}
	}
</script>

<div class="main">
	<p class="info">
		<span>time remaining: </span><strong>{DiffInHours}h</strong>
	</p>
	<div class="progress">
		<Slider value={endPercent} update={setEndTimeFromPercent} />
		{#if date}
			<span
				>{date?.getUTCDate()}/{date?.getUTCMonth() + 1}
				{date?.getUTCHours()}:{date?.getUTCMinutes()}</span
			>
		{/if}
	</div>
</div>

<style lang="scss">
	.info {
		margin: 0;
		text-align: center;
		font-size: 20px;
	}
	.main {
		margin: 2em auto;
		width: 60%;
		max-width: 600px;
	}
	.progress {
		display: flex;
		align-items: center;
	}
</style>
