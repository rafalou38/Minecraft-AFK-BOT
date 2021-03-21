import type { Request, Response } from "express";
import { dateDiffInHours } from "../../../helpers";
import Bot, { IBot } from "../../../models/bot-model";

export async function get(req: Request, res: Response, next: () => void) {
	const results = await Bot.find({ owner: req.user }).lean().exec();

	results.forEach(function (bot) {
		bot._id = bot._id.toString();
	});
	res.json({
		bots: results,
	});
}

export async function put(req: Request, res: Response, next: () => void) {
	const body = req.body as IBot;
	let update: any = {};
	if (body.name) update.name = body.name;
	if (body.ip) update.ip = body.ip;
	if (body.username) update.username = body.username;
	if (body._id) update._id = body._id;
	if (body.actions) update.actions = body.actions;
	if (body.endTime) {
		if (dateDiffInHours(new Date(), new Date(body.endTime)) > 24) {
			res.statusCode = 403;
			res.end();
		} else {
			update.endTime = body.endTime;
		}
	}

	if (Object.keys(update).length === 0) {
		res.statusCode = 422;
		res.end();
		return;
	}
	Bot.findByIdAndUpdate(body._id, update, { new: true })
		.then((updatedBot) => {
			if (updatedBot) {
				res.statusCode = 200;
				res.json(updatedBot);
			} else {
				res.statusCode = 404;
				res.json(updatedBot);
			}
		})
		.catch((err) => {
			res.statusCode = 500;
		});
}
