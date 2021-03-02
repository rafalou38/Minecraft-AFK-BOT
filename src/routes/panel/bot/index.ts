import type { Request, Response } from "express";
import Bot, { IBot } from "../../../models/bot-model";

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

export async function put(req: Request, res: Response, next: () => void) {
	const body = req.body as IBot;
	if (body.name && body.ip && body.username && body._id) {
		Bot.findByIdAndUpdate(
			body._id,
			{
				name: body.name,
				ip: body.ip,
				username: body.username,
			},
			{ new: true }
		)
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
	} else {
		res.statusCode = 422;
		res.end();
	}
}
