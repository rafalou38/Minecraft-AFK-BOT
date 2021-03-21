import type { Request, Response } from "express";
import Bot from "../../../models/bot-model";

export async function get(req: Request, res: Response, next: () => void) {
  let { bot_id } = req.params;
  if (bot_id.match(/^[0-9a-fA-F]{24}$/gm)) {
    const bot = await Bot.findById(bot_id).lean().exec();

    bot._id = bot._id.toString();

    return res.json(bot);
  } else {
    res.status(422);
    res.json({ error: "bad bot_id (does not match /^[0-9a-fA-F]{24}$/)" });
  }
}
