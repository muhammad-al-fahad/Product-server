var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/user(v 1.1.1)');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config(v 1.0.0)');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT Payload : ", jwt_payload);
    User.findOne({
        _id: jwt_payload._id
    }, (err, user) => {
        if (err) {
            return done(err, false);
        } else if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })

}));

exports.verifyUser = passport.authenticate('jwt', {session : true});

exports.verifyAdmin = function (req, res, next) {
        if (req.body.admin) {
            next();
        }
        else {
            err = new Error('Only Admin can Access this Operation!');
            err.status = 403;
            return next(err);
        }
}