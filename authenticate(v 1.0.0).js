var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/user(v 1.0.1)');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());