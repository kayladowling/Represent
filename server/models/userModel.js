var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  searchCache: [Schema.Types.Mixed]
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function(err, hash) {
    console.log(err);
    console.log(hash);
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function (err, result) {
    if (err) return console.log(err);
    console.log(result);
    cb(result);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;