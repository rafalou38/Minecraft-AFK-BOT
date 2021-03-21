import mongoose from "mongoose";

export interface IBot extends mongoose.Document {
	name: string;
	ip: string;
	username: string;
	health: number;
	position: string;
	password: string;
	owner: string;
	endTime: number;
	status: {
		color: string;
		label: string;
	};
	actions: Array<{
		id: string;
		type: string;
		params: object;
	}>;
}

export const BotSchema = new mongoose.Schema(
	{
		name: String,
		ip: String,
		username: String,
		password: String,
		health: Number,
		position: String,
		owner: String,
		endTime: Number,
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
	},
	{ typeKey: "$type" }
);

const Bot = mongoose.model<IBot>("Bot", BotSchema);
export default Bot;
