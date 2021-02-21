import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);
router.get(
	"/facebook",
	passport.authenticate("facebook", {
		scope: ["email"],
	})
);

router.get(
	"/facebook/redirect",
	passport.authenticate("facebook"),
	(req, res) => {
		res.redirect("/");
	}
);
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
	res.redirect("/");
});
export default router;
