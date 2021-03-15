<script lang="ts">
	import Drawer, { Content, Header, Subtitle, Title } from "@smui/drawer";
	import List, {
		Graphic,
		Item,
		Text,
		Subheader,
		Separator,
	} from "@smui/list";
	import H6 from "@smui/common/H6.svelte";

	import type { IBot } from "../../models/bot-model";
	import { stores, goto } from "@sapper/app";

	const { page } = stores();
	export let bot: IBot;
	export let confirm: (objectif: string) => any = undefined;
	async function handleClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.classList.contains("mdc-list-item")) {
			const objectif = target.innerText
				.split("\n")
				.pop()
				.toLocaleLowerCase();

			if ((await confirm?.(objectif)) || !confirm) {
				goto(`/panel/bot/${objectif}-${bot._id}`);
			}
		}
	}
</script>

<Drawer variant="standard" open>
	<Header>
		<img
			src="https://mc-heads.net/avatar/{bot.username}"
			alt="{bot.username}'s head"
		/>
		<Title>{bot?.name}</Title>
		<Subtitle>{bot?.ip}</Subtitle>
	</Header>
	<Content>
		<List>
			<div on:click={handleClick}>
				<Separator nav />
				<Subheader component={H6}>Status</Subheader>
				<Item activated={$page.path?.match("general") !== null}>
					<Graphic class="material-icons" aria-hidden="true"
						>info</Graphic
					>
					<Text>General</Text>
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
					<Graphic class="material-icons" aria-hidden="true"
						>build</Graphic
					>
					<Text>Actions</Text>
				</Item>
				<Item activated={$page.path?.match("config") !== null}>
					<Graphic class="material-icons" aria-hidden="true"
						>tune</Graphic
					>
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

<style>
	img {
		margin: 30px auto 0 auto;
		display: block;
		width: 50%;
	}
	:global(h6) {
		text-align: start;
	}
</style>
