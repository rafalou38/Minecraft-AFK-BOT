<script lang="ts">
	import Nav from "../components/Nav.svelte";
	import { connected } from "./_stores";

	connected.init();
</script>

<Nav />

<main>
	<slot />
</main>

<style lang="scss">
	main {
		position: relative;
		background-color: white;
		box-sizing: border-box;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	:global(#sapper) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		:global(.container) {
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
			h1 {
				font-size: 2em;
				text-transform: uppercase;
				font-weight: 700;
				margin: 0 0 0.5em 0;
				margin-top: 30px;
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
