var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var congressPersonSchema = new Schema({
  name: String,
  first_name: String,
  middle_name: String,
  last_name: String,
  id: {type: String, unique: true},
  state: String,
  district: String,
  website: String,
  party: String,
  nextElection: Number,
  facebook: String,
  twitter: String,
  totalVotes: Number,
  missedVotes: Number,
  missedVotesPerc: Number,
  votesWithParty: Number,
  chamber: String,
  seniority: Number,
  imageUrl: String
});


var CongressPerson = mongoose.model('CongressPerson', congressPersonSchema);
module.exports = CongressPerson;