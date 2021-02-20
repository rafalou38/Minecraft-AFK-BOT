console.log(
	"\n".repeat(5) + "─".repeat(15) + "┤ app started ├" + "─".repeat(15)
);

import * as sapper from "@sapper/server";
import compression from "compression";
import express from "express";
import sirv from "sirv";
import authRoutes from "./auth-routes";
import "./config/passport-setup";
import "./config/mongoose-setup";

import cookieSession from "cookie-session";
import { session } from "./config/keys";
import passport from "passport";
var morgan = require("morgan");

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express();

app.use(morgan("dev"));

// TODO use mongo db for session => express-sessions
app.use(
	cookieSession({
		maxAge: 7 * 24 * 60 * 60 * 1000,
		keys: [session.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.use(
	compression({ threshold: 0 }),
	sirv("static", { dev }),
	sapper.middleware()
);

app.listen(PORT).on("error", (e) => {
	console.log("Express error happened: ", e.message);
});
