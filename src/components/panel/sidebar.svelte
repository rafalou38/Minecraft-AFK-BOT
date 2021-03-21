<script lang="ts">
	import { fly } from "svelte/transition";
	import { botStore } from "../../routes/_stores";
	import Drawer, { Content, Header, Subtitle, Title } from "@smui/drawer";
	import IconButton from "@smui/icon-button";
	import List, { Graphic, Item, Text, Subheader, Separator } from "@smui/list";
	import H6 from "@smui/common/H6.svelte";
	import { stores, goto } from "@sapper/app";

	const { page } = stores();

	export let confirm: (objectif: string) => any = undefined;
	async function handleClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.classList.contains("mdc-list-item")) {
			const objectif = target.innerText.split("\n").pop().toLocaleLowerCase();

			if ((await confirm?.(objectif)) || !confirm) {
				goto(`/panel/bot/${objectif}-${$botStore._id}`);
			}
		}
	}
	let open = true;
	let ended = false;
</script>

{#if open}
	<div
		class="sidebar-container"
		in:fly={{ x: -200, duration: 500 }}
		out:fly={{ x: -200, duration: 500 }}
		on:outroend={() => {
			ended = true;
		}}
		on:introstart={() => {
			ended = false;
		}}
	>
		<Drawer>
			<Header>
				<img
					src="https://mc-heads.net/avatar/{$botStore.username}"
					alt="{$botStore.username}'s head"
				/>
				<Title>{$botStore?.name}</Title>
				<Subtitle>{$botStore?.ip}</Subtitle>
			</Header>
			<Content>
				<List>
					<div on:click={handleClick}>
						<Separator nav />
						<Subheader component={H6}>Status</Subheader>
						<Item activated={$page.path?.match("general") !== null}>
							<Graphic class="material-icons" aria-hidden="true">info</Graphic>
							<Text>General</Text>
						</Item>
						<Item activated={$page.path?.match("time") !== null}>
							<Graphic class="material-icons" aria-hidden="true">alarm</Graphic>
							<Text>time</Text>
						</Item>
						<Item activated={$page.path?.match("view") !== null}>
							<Graphic class="material-icons" aria-hidden="true"
								>preview</Graphic
							>
							<Text>View</Text>
						</Item>
						<Separator nav />
						<Subheader component={H6}>Settings</Subheader>
						<Item activated={$page.path?.match("actions") !== null}>
							<Graphic class="material-icons" aria-hidden="true">build</Graphic>
							<Text>Actions</Text>
						</Item>
						<Item activated={$page.path?.match("config") !== null}>
							<Graphic class="material-icons" aria-hidden="true">tune</Graphic>
							<Text>Config</Text>
						</Item>
						<Item activated={$page.path?.match("settings") !== null}>
							<Graphic class="material-icons" aria-hidden="true"
								>settings</Graphic
							>
							<Text>Settings</Text>
						</Item>
					</div>
				</List>
			</Content>
		</Drawer>
		<IconButton class="material-icons close-btn" on:click={() => (open = !open)}
			>chevron_left</IconButton
		>
	</div>
{:else if ended}
	<div
		class="side-closed"
		in:fly={{ x: -200, duration: 500 }}
		out:fly={{ x: 200, duration: 500 }}
	>
		<IconButton class="material-icons open-btn" on:click={() => (open = !open)}
			>chevron_right</IconButton
		>
	</div>
{/if}

<style lang="scss">
	img {
		margin: 30px auto 0 auto;
		display: block;
		width: 50%;
	}
	:global(h6) {
		text-align: start;
	}
	:global(.close-btn) {
		position: absolute;
		top: 0;
		right: 0;
		margin: 5px;
	}
	:global(.open-btn) {
		margin: 5px;
	}
	.side-closed {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.sidebar-container {
		position: relative;
		z-index: 2;
		border-right: 1px solid rgba(0, 0, 0, 0.12);
	}
</style>
