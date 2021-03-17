<script lang="ts">
	import Sidebar from "../../../components/panel/sidebar.svelte";

	async function confirmExit(objectif: string) {
		return true;
	}
</script>

<div class="panel">
	<Sidebar confirm={confirmExit} />
	<div class="main">
		<slot />
	</div>
</div>

<style lang="scss">
	.panel {
		display: flex;
		height: 100%;
		flex-grow: 1;
	}
	.main {
		width: 100%;
		height: 100%;
	}
</style>
