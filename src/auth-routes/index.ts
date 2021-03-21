import { Router } from "express";
import passport from "passport";
import User from "../models/user-model";
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

router.get("/local/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/panel");
});
router.get("/local/register", passport.authenticate("local"), (req, res) => {
  res.redirect("/panel");
});

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
