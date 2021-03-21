import type { Request, Response } from "express";
import Bot, { IBot } from "../../../models/bot-model";
import { get as getBots } from "./index";
export async function get(req: Request, res: Response, next: () => void) {
  if (req.user) {
    const results = await Bot.find({ owner: req.user }).lean().exec();

    if (results.length < 3) {
      new Bot({
        name: "new bot",
        ip: "",
        username: "",
        health: 0,
        position: "",
        owner: req.user,
        password: "",
        status: {
          color: "grey",
          label: "not started",
        },
        actions: [],
      } as IBot)
        .save()
        .then((newBot) => {
          res.json(newBot);
        });
    } else {
      res.status(403);
      res.end();
    }
  } else {
    res.status(401);
    res.end();
  }
}
