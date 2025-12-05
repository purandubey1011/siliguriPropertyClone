const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User.model");

module.exports = (passport) => {
  // ✅ Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          
          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              usertype: "user",
              email: profile.emails?.[0]?.value,
              avatar: profile.photos?.[0]?.value,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // ✅ Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'emails', 'photos'], // important
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            accessToken,refreshToken
          console.log("Facebook User ------->", profile);
 
          let email = profile.emails?.[0]?.value || null;
          let user = email
            ? await User.findOne({ email })
            : await User.findOne({ facebookId: profile.id });

          if (!user) {
            user = await User.create({
              facebookId: profile.id,
              name: profile.displayName,
              usertype: "user",
              email: email,
              avatar: profile.photos?.[0]?.value,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};
