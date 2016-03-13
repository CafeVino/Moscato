var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    userID: String,
	pass: String,
	token: String,
	name: String,
	age: String,
	occupation: String,
	company: String
});

module.exports = mongoose.model('User', UserSchema);