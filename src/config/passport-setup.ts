import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { google as googleKeys } from "./keys";

passport.use(
	new GoogleStrategy(
		{
			callbackURL: "/api/auth/google/redirect",
			clientID: googleKeys.clientID,
			clientSecret: googleKeys.clientSecret,
		},
		function (_accessToken, _refreshToken, profile, done) {
			console.log(profile);
		}
	)
);
