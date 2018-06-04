const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-auth").Strategy;
const db = require("../models");

function initPassportStrategies() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    try {
      const user = await db.User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}:${
          process.env.PORT
        }/auth/google/callback`
      },
      async function(accessToken, refreshToken, profile, done) {
        try {
          const email = profile.emails.find(item => item.type === "account")
            .value;
          const params = {
            email,
            photoUrl: profile.image && profile.image.url,
            name: profile.displayName
          };

          let user = await db.User.findOne({ where: { email } });
          if (user) {
            await user.update(params);
          } else {
            user = await db.User.create(params);
          }

          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}

module.exports = {
  initPassportStrategies
};
