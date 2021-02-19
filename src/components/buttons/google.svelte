<script>
	import Logo from "../svgs/google-logo.svelte";
	import BasicButton from "./basic_button.svelte";
	export let href = undefined;
</script>

<BasicButton bg_color="#4285f4" {href}>
	<Logo />
	<p>login with google</p>
</BasicButton>
