import { model, Schema } from "mongoose";

const userSchema = new Schema({
	username: String,
	auth_type: String,
	id: String,
});

export const User = model("user", userSchema);
