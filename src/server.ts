import * as sapper from "@sapper/server";
import compression from "compression";
import express from "express";
import mongoose from "mongoose";
import sirv from "sirv";
import authRoutes from "./auth-routes";
import { mongodb } from "./config/keys";
import "./config/passport-setup";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express(); // You can also use Express

app.use("/api/auth", authRoutes);

mongoose.connect(
	mongodb.dbURI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("connected to MongoDB ✅");
	}
);

app.use(
	compression({ threshold: 0 }),
	sirv("static", { dev }),
	sapper.middleware()
);

app.listen(PORT, () => {
	console.log(`Listening on port: http://localhost:${PORT}`);
}).on("error", (e) => {
	console.log("Error happened: ", e.message);
});
