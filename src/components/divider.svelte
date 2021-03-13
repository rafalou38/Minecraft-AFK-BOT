<script>
	export let width = undefined;
</script>

<div style={width ? "width: {width}" : ""}>
	<span />
	<p><slot>divider</slot></p>
	<span />
</div>

<style lang="scss">
	div {
		width: 300px;
		display: flex;
		align-items: center;
		color: rgba(0, 0, 0, 0.6);
		box-sizing: border-box;
		span {
			flex-grow: 1;
			height: 1px;
			background-color: rgba(0, 0, 0, 0.4);
			margin: 0 10px;
		}
	}
</style>
