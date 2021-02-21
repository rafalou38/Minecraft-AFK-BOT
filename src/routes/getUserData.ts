import User from "../models/user-model";

export async function get(req, res) {
	let user = await User.findById(req.user).lean().exec();
	res.json(user);
}
