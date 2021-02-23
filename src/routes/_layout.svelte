<script lang="ts">
	import Nav from "../components/Nav.svelte";
	import { connected } from "./_stores";

	connected.init();
</script>

<Nav />

<main>
	<slot />
</main>

<style lang="scss" global>
	main {
		position: relative;
		background-color: white;
		box-sizing: border-box;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	#sapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.container {
			position: relative;
			display: flex;
			align-items: center;
			flex-direction: column;

			width: 80%;
			max-width: 56em;
			height: 100%;
			z-index: 1;
			flex-grow: 1;

			box-sizing: border-box;
			margin: 0 auto;
			padding: 50px;

			background-color: white;
			&-full {
				width: 100%;
				max-width: none;
			}
			p {
				margin: 1em auto;
				span {
					opacity: 0.7;
				}
			}
		}
	}
</style>
