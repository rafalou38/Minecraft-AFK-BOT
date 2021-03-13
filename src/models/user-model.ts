import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
	email?: string;
	username: string;
	auth_type: "google" | "email" | "facebook" | "local";
	strategy_id?: string;
	password?: string;
}

export const UserSchema = new mongoose.Schema({
	username: String,
	auth_type: String,
	email: String,
	strategy_id: String,
	password: String,
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
