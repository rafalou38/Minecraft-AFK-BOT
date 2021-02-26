import type { Request, Response } from "express";
import Bot from "../../../models/bot-model";

export async function get(req: Request, res: Response, next: () => void) {
	const results = await Bot.find({ owner: req.user }).lean().exec();
	console.log("called");

	results.forEach(function (bot) {
		bot._id = bot._id.toString();
	});
	res.json({
		bots: results,
	});
}
