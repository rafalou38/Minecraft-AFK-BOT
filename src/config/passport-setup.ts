import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User, { IUser } from "../models/user-model";
import { google, facebook } from "./keys";

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
