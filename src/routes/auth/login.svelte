<script>
	import GoogleButton from "../../components/buttons/google.svelte";
	import FacebookButton from "../../components/buttons/facebook.svelte";
</script>

<h2>Login</h2>

<div class="form">
	<GoogleButton href="/api/auth/google" />
</div>

<style>
	.form {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
