const express = require("express");
const router = express.Router();
const LocalUser = require("../model/users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;


//passport section here:
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await LocalUser.loginGoogleUser(profile.emails[0].value, profile.displayName, profile.id);
        return done(null, profile.displayName);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async function (req, email, password, done) {
      try{
        const match = await LocalUser.loginLocalUser(email, password);
        if (match.isValidPassword) {
          return done(null, match.username);
        } else {
          return done(null, null);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (username, done) {
  done(null, username);
});

passport.deserializeUser(function (username, done) {
  done(null, username);
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login" }),
  function (req, res) {
    res.cookie('username', req.session.passport.user, {maxAge: 24*60*60*1000}).redirect("http://localhost:8080/");
  }
);

router.post(
  "/signup",
  async function (req, res){
    const isUserCreated = await LocalUser.createLocalUser(req.body.email, req.body.username, req.body.password);
    if(!isUserCreated){
      res.redirect("http://localhost:8080/signup/");
      return;
    }
    res.redirect("http://localhost:8080/login/");
  }
);

// Google OAuth login route
router.get('/auth/google',
  passport.authenticate('google', {scope: ['profile', 'email']}));

// Google OAuth callback route
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.cookie('username', req.session.passport.user, {maxAge: 24*60*60*1000}).redirect('/');
});

module.exports = router;
