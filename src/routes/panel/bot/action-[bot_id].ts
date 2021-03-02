import type { Request, Response } from "express";
import Bot from "../../../models/bot-model";

export async function get(req: Request, res: Response, next: () => void) {
	const bot = await Bot.findById(req.params.bot_id).lean().exec();

	bot._id = bot._id.toString();

	res.json(bot);
}
