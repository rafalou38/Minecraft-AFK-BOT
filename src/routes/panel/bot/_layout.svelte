<script lang="ts">
	import Sidebar from "../../../components/panel/sidebar.svelte";

	async function confirmExit(objectif: string) {
		return true;
	}
</script>

<div class="panel">
	<Sidebar confirm={confirmExit} />
	<slot />
</div>

<style lang="scss">
	.panel {
		display: flex;
		height: 100%;
		flex-grow: 1;
	}
</style>
