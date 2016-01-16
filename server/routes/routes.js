var app = require('../server');
var express = require('express');
var CongressPerson = require('../models/congressPersonModel');
var scraperjs = require('scraperjs');

var router = express.Router();
var User = require('../models/userModel');

//modified to return an array of all representatives names
router.get('/allMembers', function(req, res){
  CongressPerson.find({}, function(err, people){
    var repNames = [];
    String.prototype.capitalize = function() {
      return this.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(a) { return a.toUpperCase(); });
    };
    for(var i = 0; i < people.length; i++){
      repNames.push(people[i].name.capitalize());
    }
    res.send(repNames);
  });
});


router.get('/getOneMember/:name', function(req, res){
  CongressPerson.findOne({name: req.params.name}, function(err, person){
    if(person === null) {
      res.send(404, "person not found");
    } else {
    //Scrape the bio first
      scraperjs.StaticScraper.create('http://bioguide.congress.gov/scripts/biodisplay.pl?index='+person.id)
        .scrape(function($) {
          return $("body").map(function() {
            return $(this).text();
          }).get();
        })
        .then(function(bio) {
          console.log(bio);
          res.send({member: person, memberBio: bio});
        })
        .catch(function() {
          res.send({member: person});
        });
    }

  });
});

router.get('/byState/:state', function(req, res) {
  CongressPerson.find({state: req.params.state}, function(err, people){
    if (err) console.log(err);
    res.send(people);
  });
});



router.get('/user/:email', function(req, res) {
  User.findOne({email: req.params.email}, function (err, user) {
    if (err) console.log(err);
    res.send(user);
  });
});

router.post('/user/cacheSearch', function(req, res){
  User.findOne({_id: req.body._id}, function(err, user){
    var currCache = user.searchCache;
    var duplicate = false;
    console.log(req.body.search);
    for(var i = 0; i < currCache.length; i++){
      if(currCache[i].id === req.body.search.id) duplicate = true;
    }
    if(!duplicate){
      currCache = [req.body.search].concat(currCache);
      if(currCache.length > 10){
        currCache.pop();
      }
      user.searchCache = currCache;
      user.save();
    }
    // console.log(currCache, ' the currCache');
    res.send(currCache);
  });
});

router.post('/user', function (req, res) {
  User.findOne({email: req.body.email}, function (err, user) {

    // 'email' is for lookup, 'newEmail' is to set a new email.
    if (req.body.newEmail) user.email = req.body.newEmail;

    // We don't want to do anything else with these emails.
    delete req.body.email;
    delete req.body.newEmail;

    // For every other key, set them directly to the user object.
    for (var key in req.body) {
      user[key] = req.body[key];
    }

    user.save();
    delete user.password;

    // A user object without email or password will be set back.
    res.send(user);
  });
});

module.exports = router;