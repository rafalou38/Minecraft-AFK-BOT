import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/user-model";
import { google } from "./keys";

passport.serializeUser((user: IUser, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
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
					console.log(`user is`, currentUser);
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
							console.log("new User created:", newUser.username);
							done(null, newUser);
						});
				}
			});
		}
	)
);
