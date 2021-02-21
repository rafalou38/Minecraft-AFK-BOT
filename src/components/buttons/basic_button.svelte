<script>
	import Ripple from "@smui/ripple";
	export let bg_color = "#10aa50";
	export let color = "#ffffff";
	export let border = "";
	export let href = undefined;
</script>

{#if href}
	<a {href}>
		<button
			class="btn google"
			style="
			background-color: {bg_color};
			color: {color};
			border: {border};
			"
			use:Ripple={{ ripple: true, color: "surface" }}
		>
			<slot>
				<p>button</p>
			</slot>
		</button>
	</a>
{:else}
	<button
		class="btn google"
		style="background-color: {bg_color}"
		use:Ripple={{ ripple: true, color: "surface" }}
	>
		<slot>
			<p>button</p>
		</slot>
	</button>
{/if}
<br />

<style lang="scss">
	a {
		display: contents;
	}
	.btn {
		min-height: 100%;
		width: 300px;
		margin-bottom: 10px;
		padding: 5px;

		display: flex;
		align-items: center;

		user-select: none;
		cursor: pointer;

		border: none;
		border-radius: 3px;
		color: white;

		font-weight: 500;
		font-size: 15px;
		text-align: center;
		font-family: roboto;
		:global(p) {
			margin: 0;
			flex-grow: 1;
		}
	}
</style>
