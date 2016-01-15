var app = require('../server');
var express = require('express');
var CongressPerson = require('../models/congressPersonModel');
var scraperjs = require('scraperjs');

var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');


router.get('/', function(req, res){
  res.send('You reached the AUTH route!');
});

router.post('/login',
  passport.authenticate('local'),
  function(req,res) {
    //searchCache holds the user's previous searches
    console.log('/login!!');
    res.send({_id: req.user._id, searchCache: req.user.searchCache});
  }
);

router.get('/logout', function(req,res) {
  console.log('/logout!!');
    req.logout();
    res.end();
  }
);

router.post('/register',
  function(req,res) {
    User.findOne({email: req.body.email}, function(err, user) {
      console.log('/register!!');
      if (err) console.log(err);
      if (!user) {
        //save username and password to database
        User.create({password: req.body.password, email: req.body.email, searchCache: []}, function(err, user){
          if (err) console.log(err);
          //redirect to loggedin version of search page
          res.send({_id: user._id, searchCache: user.searchCache});
        });
      } else {
        res.send('This account already exists');
      }
    });
  }
);

module.exports = router;