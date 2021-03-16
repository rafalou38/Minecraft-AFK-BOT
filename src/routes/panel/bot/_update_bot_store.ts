import { botStore } from "../../_stores";

export default async function (page) {
	const { bot_id } = page.params;
	botStore.updateAsync(async (oldBot) => {
		if (oldBot?._id !== bot_id) {
			let newBot = await this.fetch(`/panel/bot/action-${bot_id}`);
			newBot = await newBot.json();
			return newBot;
		} else {
			return oldBot;
		}
	});
}
