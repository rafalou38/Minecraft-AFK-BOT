import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../models/user-model";
import { google, facebook } from "./keys";
import type { Request } from "express";

passport.serializeUser((user: IUser, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	done(null, id);
});

passport.use(
	new GoogleStrategy(
		{
			callbackURL: "/api/auth/google/redirect",
			clientID: google.clientID,
			clientSecret: google.clientSecret,
		},
		function (_accessToken, _refreshToken, profile, done) {
			User.findOne({
				auth_type: "google",
				strategy_id: profile.id,
			}).then((currentUser) => {
				if (currentUser) {
					done(null, currentUser);
				} else {
					new User({
						username: profile.displayName,
						strategy_id: profile.id,
						email: profile.emails ? profile.emails[0].value : null,
						auth_type: "google",
					})
						.save()
						.then((newUser) => {
							done(null, newUser);
						});
				}
			});
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			callbackURL: "http://localhost:3000/api/auth/facebook/redirect/",
			clientID: facebook.clientID,
			clientSecret: facebook.clientSecret,
		},
		function (_accessToken, _refreshToken, profile, done) {
			User.findOne({
				auth_type: "facebook",
				strategy_id: profile.id,
			}).then((currentUser) => {
				if (currentUser) {
					done(null, currentUser);
				} else {
					new User({
						username: profile.displayName,
						strategy_id: profile.id,
						email: profile.emails ? profile.emails[0].value : null,
						auth_type: "facebook",
					})
						.save()
						.then((newUser) => {
							done(null, newUser);
						});
				}
			});
			console.log(profile);
		}
	)
);

passport.use(
	new LocalStrategy(
		{ passReqToCallback: true },
		function (req: Request, username, password, done) {
			User.findOne({ username: username, auth_type: "local" }).then(
				(currentUser) => {
					if (req.url.match("login")) {
						// user wants to login
						if (currentUser && password == currentUser.password) {
							return done(null, currentUser); // existing user and passwords match
						} else {
							console.log("bad pass");

							return done(null, false); // passwords do not match or no user
						}
					} else {
						// user wants to register
						if (currentUser) {
							return done(null, false); // user already exists
						} else {
							new User({
								// create new user
								username,
								password,
								auth_type: "local",
							})
								.save()
								.then((newUser) => {
									return done(null, newUser);
								});
						}
					}
				}
			);
		}
	)
);
