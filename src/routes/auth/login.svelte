<script lang="ts">
	import GoogleButton from "../../components/buttons/google.svelte";
	import FacebookButton from "../../components/buttons/facebook.svelte";

	import Divider from "../../components/divider.svelte";

	import Button, { Label } from "@smui/button";
	import Textfield from "@smui/textfield";

	import md5 from "md5";
	import { redirect } from "../../helpers";
	// import { goto } from "@sapper/app";

	let username = "";
	let password = "";
	let error_message = "";
	function loginLocal() {
		fetch(
			"/api/auth/local/login?" +
				new URLSearchParams({
					password: md5(password),
					username: username,
				})
		)
			.then((res) => {
				if (res.status == 401) {
					error_message = "bad credentials or username";
				} else {
					redirect("/panel");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<div class="bg" />
<div class="container">
	<h1>Login</h1>
	<p>Chose your favorite way of login</p>
	<div class="btn-container">
		<GoogleButton href="/api/auth/google" />
		<!-- <MicrosoftButton href="/api/auth/microsoft" /> -->
		<FacebookButton href="/api/auth/facebook" />
	</div>
	<Divider width="300px">or</Divider>
	<form on:submit|preventDefault={loginLocal}>
		<div class="hidden">
			<input type="text" bind:value={username} />
			<input type="password" bind:value={password} />
		</div>
		<Textfield
			variant="filled"
			label="username"
			bind:value={username}
			on:focus={() => {
				error_message = "";
			}}
			class="field"
		/>

		<Textfield
			variant="filled"
			label="password"
			type="password"
			bind:value={password}
			on:focus={() => {
				error_message = "";
			}}
			class="field"
		/>
		{#if error_message}
			<p class="err-msg">{error_message}</p>
		{/if}
		<Button variant="raised" class="submit-btn"><Label>Login</Label></Button
		>
	</form>
</div>

<style lang="scss">
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
	form {
		display: flex;
		flex-direction: column;
		width: 300px;
		:global(.field) {
			margin-bottom: 10px;
		}
		:global(.submit-btn) {
			width: 100px;
			margin: 10px auto;
		}
		.hidden {
			display: none;
		}
		.err-msg {
			font-size: 14px;
			margin: 0 !important;
			text-align: center;
			color: #ff0033;
		}
	}
</style>
