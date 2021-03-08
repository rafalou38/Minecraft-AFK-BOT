import mongoose from "mongoose";

export interface IBot extends mongoose.Document {
	name: string;
	ip: string;
	username: string;
	health: number;
	position: string;
	owner: string;
	status: {
		color: string;
		label: string;
	};
	actions: [
		{
			id: string;
			type: string;
			params: object;
		}
	];
}

export const BotSchema = new mongoose.Schema({
	name: String,
	ip: String,
	username: String,
	health: Number,
	position: String,
	owner: String,
	status: {
		color: String,
		label: String,
	},
	actions: [
		{
			id: String,
			type: String,
			params: Object,
		},
	],
});

const Bot = mongoose.model<IBot>("Bot", BotSchema);
export default Bot;
