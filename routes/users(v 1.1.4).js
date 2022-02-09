var express = require('express');
var bodyParser = require('body-parser');
var User = require('../model/user(v 1.1.1)');
var passport = require('passport');
var authenticate = require('../authenticate(v 1.2.0)');
const cors = require('./cors(v 1.0.0)');

var router = express.Router();
router.use(bodyParser.json());

router.get('/', cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    } else {
      res.statusCode = 200;
      res.setHeader('Content_type', 'application/json');
      res.json(users);
    }
  })
});

router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
 if(err){
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.json({err: err});
 }  else {
  if (req.body.firstname)
    user.firstname = req.body.firstname;
  if (req.body.lastname)
    user.lastname = req.body.lastname;
  user.save((err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
      return ;
    }
  passport.authenticate('local')(req, res, () => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'Registration Successful!'});
        });
      });
   }
  });
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res, next) => {
   var token = authenticate.getToken({_id: req.user._id}); 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.json({success: true, token : token, status: 'Registration Successful!'});
});


router.get('/logout', cors.cors, (req, res, next) => {
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