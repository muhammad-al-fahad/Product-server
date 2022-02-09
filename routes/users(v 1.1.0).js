var express = require('express');
var bodyParser = require('body-parser');
var User = require('../model/user(v 1.0.1)');
var passport = require('passport');

var router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  console.log(req.session);
  res.send('respond with a resource');
  next();
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
 if(err){
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.json({err: err});
 }else{
  passport.authenticate('local')(req, res, () => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'Registration Successful!'});
        });
      }
   });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.json({success: true, status: 'Registration Successful!'});
});


router.get('/logout', (req, res, next) => {
  if(!req.session) {
      var err = new Error('User is not Logged in!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
  else if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
});

module.exports = router;