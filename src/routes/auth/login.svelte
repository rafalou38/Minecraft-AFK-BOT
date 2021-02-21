<script>
	import Textfield from "@smui/textfield";

	import GoogleButton from "../../components/buttons/google.svelte";
	import MicrosoftButton from "../../components/buttons/microsoft.svelte";
	import FacebookButton from "../../components/buttons/facebook.svelte";

	import Divider from "../../components/divider.svelte";
</script>

<div class="bg" />
<div class="container">
	<h1>Login</h1>
	<p>Chose your favorite way of login</p>
	<div class="btn-container">
		<GoogleButton href="/api/auth/google" />
		<MicrosoftButton href="/api/auth/microsoft" />
		<FacebookButton href="/api/auth/facebook" />
	</div>
	<Divider width="300px">or</Divider>
	<!-- <form action="/api/auth/local">
		<Textfield type="email" label="Email" />
		<Textfield label="Username" />
		<Textfield type="password" label="Password" />
	</form> -->
	<Textfield textarea label="Comment" />
</div>

<style>
	.btn-container {
		width: 100%;
		margin: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;

		width: 100%;
		height: 100%;

		background-image: url(images/minecraft-bg.bmp);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
</style>
