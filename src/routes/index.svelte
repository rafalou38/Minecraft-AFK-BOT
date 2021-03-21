<script lang="ts">
  import Button, { Label } from "@smui/button";
  import { user, connected } from "./_stores";
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<div class="bg" />
<div class="container">
  <h1>Minecraft AFKBot</h1>
  <p>
    free bots for afk command execution or daily connection <span
      >or for troll 😉</span
    >
  </p>
  <div class="btn-container">
    <Button href="/auth/login" variant="raised"><Label>Join!</Label></Button>
  </div>
  <pre>
		{JSON.stringify($user, undefined, 2)}
		{JSON.stringify($connected)}

	</pre>
</div>

<style lang="scss">
  .btn-container {
    width: 100%;
    margin: 30px;
    display: flex;
    justify-content: center;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    width: 100%;
    height: 100%;

    background-image: url(images/bot-run.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
</style>
