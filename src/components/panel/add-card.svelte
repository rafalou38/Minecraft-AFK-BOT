<script lang="ts">
	import Ripple from "@smui/ripple";
</script>

<div class="card" use:Ripple={{ ripple: true, color: "surface" }}>
	<h3 class="primary">new bot</h3>
	<p class="secondary">+</p>
</div>

<style lang="scss">
	.card {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 300px;
		height: 300px;

		background: #e9e9e9;
		border-radius: 10px;

		font-family: "Roboto", Arial, Helvetica, sans-serif;
		font-weight: 500;
		text-align: center;
		line-height: 1;

		margin: 20px;
		h3 {
			font-size: 40px;
			font-weight: bold;
			margin-top: 10px;
			margin-bottom: 0;
			color: #aaa;
		}
		p {
			font-weight: 500;
			font-size: 100px;
			margin: 0;
			color: #888;
		}
	}
</style>
