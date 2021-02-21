<script lang="ts">
	export let segment: string;
</script>

<nav>
	<div class="left">
		<a class="logo" href="/">Minecraft AFK BOT</a>
	</div>
	<ul>
		<li>
			<a
				aria-current={segment === "auth" ? "page" : undefined}
				href="auth/login">login</a
			>
		</li>
	</ul>
</nav>

<style lang="scss">
	nav {
		padding: 0 1em;
		display: flex;
		background-color: DodgerBlue;
		color: white;
		justify-content: space-between;
		font-family: Rubik;

		.left {
			display: flex;
		}
		.logo {
			font-weight: 500;
			margin-right: 20px;
		}
		ul {
			margin: 0;
			padding: 0;
		}

		li {
			display: block;
			float: left;
		}

		a {
			text-decoration: none;
			padding: 1em 0.5em;
			display: block;
		}
	}
</style>
