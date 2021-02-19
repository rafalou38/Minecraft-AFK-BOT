<script>
	import Ripple from "@smui/ripple";
	export let bg_color = "#10aa50";
	export let href = undefined;
</script>

{#if href}
	<a {href}>
		<button
			class="btn google"
			style="background-color: {bg_color}"
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
		border: none;
		user-select: none;
		display: flex;
		align-items: center;
		padding: 5px;
		border-radius: 3px;
		width: 100%;
		max-width: 300px;
		text-align: center;
		font-weight: 500;
		font-size: 15px;
		color: white;
		font-family: roboto;
		cursor: pointer;
		margin-bottom: 10px;
		:global(p) {
			margin: 0;
			flex-grow: 1;
		}
	}
</style>
