<script lang="ts">
	import Select, { Option } from "@smui/select";
	import Ripple from "@smui/ripple";
	import Textfield from "@smui/textfield";
	import HelperText from "@smui/textfield/helper-text/index";

	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	const types = ["chat", "wait", "goto", "ControlState"];

	export let action = {
		id: "",
		type: "",
		params: {},
	};
</script>

<div class="action">
	<div
		class="delete"
		use:Ripple={{ ripple: true, color: "surface" }}
		on:click={() => dispatch("delete", action.id)}
	>
		<span class="material-icons"> delete </span>
	</div>
	<div class="body">
		<div class="select-container">
			<Select
				variant="filled"
				bind:value={action.type}
				label="type"
				anchor$class="select"
				menu$class="select"
			>
				<Option value="" />
				{#each types as type}
					<Option value={type}>{type}</Option>
				{/each}
			</Select>
		</div>
		<div class="params">
			<p>params</p>
			{#each Object.entries(action.params) as [label, value]}
				{#if typeof value === typeof ""}
					{#if value.length > 60}
						<Textfield
							textarea
							bind:value
							{label}
							input$aria-controls="helper-text-textarea"
							input$aria-describedby="helper-text-textarea"
						/>
						<HelperText id="helper-text-textarea"
							>Helper Text</HelperText
						>
					{:else}
						<Textfield variant="outlined" {label} bind:value />
					{/if}
				{/if}
			{/each}
		</div>
	</div>
	<div class="drag" use:Ripple={{ ripple: true, color: "surface" }}>
		<span class="material-icons"> drag_indicator </span>
	</div>
</div>

<style lang="scss">
	.action {
		width: 100%;
		margin-bottom: 10px;
		border: 2px solid DimGray;
		border-radius: 10px;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		.body {
			flex-grow: 1;
			.select-container {
				:global(.select) {
					width: 100%;
				}
				padding: 0.5em;
				height: max-content;
				border-bottom: 2px solid DarkGray;
			}
			.params {
				padding: 0.5em;
				p {
					text-align: center;
					margin-top: 0;
				}
				:global(label) {
					width: 100%;
				}
			}
		}
		.drag,
		.delete {
			width: 3em;
			display: grid;
			place-items: center;
			user-select: none;
		}
		.drag {
			border-left: 2px solid DarkGray;
			cursor: grab;
		}
		.delete {
			border-right: 2px solid DarkGray;
			color: darkred;
		}
	}
</style>
