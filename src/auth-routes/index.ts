import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/logout", (req, res) => {
	// TODO handle with passport
	res.send("logging out 👋");
});

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
	res.redirect("/");
});
export default router;
