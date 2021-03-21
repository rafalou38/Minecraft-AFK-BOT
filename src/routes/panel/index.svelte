<script lang="ts" context="module">
  export async function preload(page, session) {
    const res = await this.fetch("/panel/bot/");
    return await res.json();
  }
</script>

<script lang="ts">
  import type IBot from "../../models/bot-model";
  import BotCard from "../../components/panel/bot-card.svelte";
  import AddCard from "../../components/panel/add-card.svelte";

  export let bots: typeof IBot[] = [];
</script>

<h1>Select a BOT</h1>

<div class="bots-container">
  {#if bots.length <= 2}
    <AddCard />
  {/if}
  {#each bots as bot}
    <BotCard {bot} />
  {/each}
</div>

<div class="floating-count">{bots.length} / 3</div>

<style>
  h1 {
    margin-top: 20px;
    color: #adadad;
    font-weight: bold;
    font-size: 2.5em;
  }
  .bots-container {
    display: flex;
    padding: 50px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .floating-count {
    position: fixed;
    margin: 20px;
    right: 0;
    bottom: 0;
    font-size: 2em;
    font-weight: 900;
    color: #adadad;
  }
</style>
