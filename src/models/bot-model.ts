import mongoose from "mongoose";
import IUser from "./user-model";
export interface IBot extends mongoose.Document {
	name: string;
	ip: string;
	id: string;
	username: string;
	health: Int32Array;
	position: string;
	owner: User;
	status: {
		color: string;
		label: string;
	};
}

export const BotSchema = new mongoose.Schema({
	name: String,
	ip: String,
	id: String,
	username: String,
	health: Int32Array,
	position: String,
	status: {
		color: String,
		label: String,
	},
});

const Bot = mongoose.model<IBot>("Bot", BotSchema);
export default Bot;

new Bot();
