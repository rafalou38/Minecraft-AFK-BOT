import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";
import authRoutes from "./auth-routes";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const app = express(); // You can also use Express

app.use("/api/auth", authRoutes);

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
