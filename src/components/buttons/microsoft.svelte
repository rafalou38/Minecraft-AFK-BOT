<script>
  import Logo from "../svgs/microsoft-logo.svelte";
  import BasicButton from "./basic_button.svelte";
  export let href = undefined;
</script>

<BasicButton
  bg_color="#ffffff00"
  {href}
  color="#000000"
  border="2px solid #8D8D8D"
>
  <Logo />
  <p>login with Microsoft</p>
</BasicButton>

<style>
  p {
    font-weight: 400;
  }
</style>
