import mongoose from "mongoose";
import { mongodb } from "./keys";

mongoose.connect(
	mongodb.dbURI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("connected to MongoDB ✅");
	}
);
