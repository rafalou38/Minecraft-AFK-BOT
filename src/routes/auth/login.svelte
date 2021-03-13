<script lang="ts">
	import GoogleButton from "../../components/buttons/google.svelte";
	import FacebookButton from "../../components/buttons/facebook.svelte";

	import Divider from "../../components/divider.svelte";

	import Button, { Label } from "@smui/button";
	import Textfield from "@smui/textfield";
	import Icon from "@smui/textfield/icon/index";

	import md5 from "md5";
	import { redirect } from "../../helpers";
	// import { goto } from "@sapper/app";

	let username = "";
	let password = "";
	let password2 = "";
	let error_message = "";
	let register = false;
	let show_password = false;
	function loginLocal() {
		fetch(
			`/api/auth/local/${register ? "register" : "login"}?` +
				new URLSearchParams({
					password: md5(password),
					username: username,
				})
		)
			.then((res) => {
				if (res.status == 401) {
					error_message = register
						? "username already taken"
						: "bad credentials or username";
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
	<h1>{register ? "Register" : "Login"}</h1>
	<p>Chose your favorite way {register ? "to register" : "of login"}</p>
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
			type={show_password ? "text" : "password"}
			withTrailingIcon
			bind:value={password}
			on:focus={() => {
				error_message = "";
			}}
			class="field"
			><Icon
				class="material-icons"
				role="button"
				on:click={() => (show_password = !show_password)}
				>{show_password ? "visibility_off" : "visibility"}</Icon
			></Textfield
		>
		{#if register}
			<Textfield
				variant="filled"
				label="confirm password"
				type={show_password ? "text" : "password"}
				withTrailingIcon
				bind:value={password2}
				on:focus={() => {
					error_message = "";
				}}
				class="field"
				><Icon
					class="material-icons"
					role="button"
					on:click={() => (show_password = !show_password)}
					>{show_password ? "visibility_off" : "visibility"}</Icon
				></Textfield
			>
		{/if}

		{#if error_message}
			<p class="err-msg">{error_message}</p>
		{/if}
		<Button variant="raised" class="submit-btn"
			><Label>{register ? "Register" : "Login"}</Label></Button
		>
		{#if register}
			<!-- content here -->
			<small
				>already have an account? <button
					class="link"
					on:click={() => {
						register = false;
					}}>login</button
				></small
			>
		{:else}
			<!-- else content here -->
			<small
				>Dont have an account? <button
					class="link"
					on:click={() => {
						register = true;
					}}>register</button
				></small
			>
		{/if}
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
		small {
			text-align: center;
			opacity: 0.7;
			margin-top: 20px;
			font-size: 16px;
		}
	}
	button.link {
		color: blue;
		display: inline;
		border: none;
		padding: 0;
		background: none;
		text-decoration: underline;
		cursor: pointer;
		font-size: 16px;
		font-family: Roboto;
		line-height: 24px;
	}
</style>
