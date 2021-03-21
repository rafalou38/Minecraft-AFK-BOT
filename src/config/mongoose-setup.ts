import mongoose from "mongoose";
import { mongodb } from "./keys";

mongoose.set("useFindAndModify", false);

export const connect = new Promise<void>((resolve, reject) => {
	mongoose.connect(
		mongodb.dbURI,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		(err) => {
			if (err) {
				console.error("there was an error connecting to MongoDB ❌");
				reject();
			}
			console.log("connected to MongoDB ✅");
			resolve();
		}
	);
});
