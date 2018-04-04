const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-auth').Strategy
const MD5 = require('crypto-js/md5');
const db = require('../models');

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  try {
    const user = await db.User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use(new LocalStrategy({
  passwordField: 'token',
  passReqToCallback: true
}, async function (req, _, _, done) {
  console.log(_, token)
  // try {
    
  //   const user = await db.User.findOne({ where: { token } });
  //   done(null, user)
  // } catch (err) {
  //   done(err);
  // }
}))

passport.use(new GoogleStrategy({
  clientId: '382584208375-fdu2bu3vfrshh2g4l8fragl9l75tind2.apps.googleusercontent.com',
  clientSecret: 'U1bsSAPwzkgUVVbpSSC_E4Kz',
  callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const email = profile.emails.find(item => item.type === 'account').value;
      const params = {
        email,
        token: MD5(accessToken).toString(),
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
))