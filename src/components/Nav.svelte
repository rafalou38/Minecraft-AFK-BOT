<script lang="ts">
  import { connected } from "../routes/_stores";
</script>

<nav>
  <div class="left">
    <a class="logo" href="/">Minecraft AFK BOT</a>
  </div>
  <ul>
    {#if $connected}
      <li>
        <a href="/panel" class="icon" title="panel"
          ><span class="iconify" data-icon="mdi:robot" data-inline="true" /></a
        >
      </li>
      <li>
        <a href="/api/auth/logout" class="icon" title="logout"
          ><span class="iconify" data-icon="mdi:logout" data-inline="true" /></a
        >
      </li>
    {:else}
      <li>
        <a href="/auth/login">login</a>
      </li>
    {/if}
  </ul>
</nav>

<style lang="scss">
  @import "../theme/_smui-theme.scss";

  nav {
    padding: 0 1em;
    display: flex;
    background-color: $mdc-theme-primary;
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
      display: flex;
      align-items: center;
    }

    li {
      display: block;
      float: left;
    }
    .icon {
      font-size: 30px;
      padding: 0 0 0 0.5em;
    }
    a {
      text-decoration: none;
      padding: 1em 0.5em;
      display: block;
    }
  }
</style>
