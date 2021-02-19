import { Router } from "express";
const router = Router();

router.get("/google", (req, res) => {
	// TODO handle with passport
	res.send("logging with passport");
});

router.get("/logout", (req, res) => {
	// TODO handle with passport
	res.send("logging out 👋");
});

export default router;
