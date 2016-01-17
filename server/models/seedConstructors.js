var senateSeed = require('./senateSeed');
var houseSeed = require('./houseSeed');
var CongressPerson = require('./congressPersonModel');

var seedPerson = function (person, nextPerson) {
    var fullName = nextPerson.first_name + ' ' + nextPerson.last_name;
    person.name = fullName.toLowerCase();
    person.website = nextPerson.url;
    person.nextElection = nextPerson.next_election;
    person.facebook = nextPerson.facebook_account;
    person.twitter = nextPerson.twitter_account;
    person.totalVotes = nextPerson.total_votes;
    person.missedVotes = nextPerson.missed_votes;
    person.missedVotesPerc = nextPerson.missed_votes_pct;
    person.votesWithParty = nextPerson.votes_with_party_pct;
    person.imageUrl = 'https://theunitedstates.io/images/congress/225x275/' + nextPerson.id + '.jpg';
    delete nextPerson.url;
    delete nextPerson.next_election;
    delete nextPerson.facebook_account;
    delete nextPerson.twitter_account;
    delete nextPerson.total_votes;
    delete nextPerson.missed_votes;
    delete nextPerson.missed_votes_pct;
    delete nextPerson.votes_with_party_pct;
    for (var key in nextPerson) {
        person[key] = nextPerson[key];
    }

    return person;
};

exports.seedSenate = function(){
  for(var i = 0; i < senateSeed.length; i++){
    var nextPerson = senateSeed[i];
    var person = new CongressPerson;
    person = seedPerson(person, nextPerson);

    person.chamber = 'senate';
    person.save();
    console.log('senate member');
  }
};

exports.seedHouse = function(){
  for(var i = 0; i < houseSeed.length; i++){
    var nextPerson = houseSeed[i];
    var person = new CongressPerson;
    person = seedPerson(person, nextPerson);
    person.chamber = 'house';
    person.save();
    console.log('house member');
  }
};