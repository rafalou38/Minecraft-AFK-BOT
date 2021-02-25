<script lqng="ts" context="module">
	export async function preload(page, session) {
		const { bot_id } = page.params;

		return { bot_id };
	}
</script>

<script lang="ts">
	export let bot_id;
</script>

<h3>{bot_id}</h3>
