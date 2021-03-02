<script lang="ts">
	import Drawer, { Content, Header, Subtitle, Title } from "@smui/drawer";
	import List, { Graphic, Item, Text } from "@smui/list";
	import type { IBot } from "../../models/bot-model";
	import { stores } from "@sapper/app";

	const { page } = stores();
	export let bot: IBot;

	console.log($page.path?.match("settings"));
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
			<Item
				href={`panel/bot/status-${bot._id}`}
				activated={$page.path?.match("status") !== null}
			>
				<Graphic class="material-icons" aria-hidden="true">info</Graphic
				>
				<Text>Status</Text>
			</Item>
			<Item
				href={`panel/bot/settings-${bot._id}`}
				activated={$page.path?.match("settings") !== null}
			>
				<Graphic class="material-icons" aria-hidden="true"
					>settings</Graphic
				>
				<Text>Settings</Text>
			</Item>
			<Item
				href={`panel/bot/actions-${bot._id}`}
				activated={$page.path?.match("actions") !== null}
			>
				<Graphic class="material-icons" aria-hidden="true"
					>build</Graphic
				>
				<Text>Actions</Text>
			</Item>
		</List>
	</Content>
</Drawer>

<style>
	img {
		margin: 30px auto 0 auto;
		display: block;
		width: 50%;
	}
</style>
