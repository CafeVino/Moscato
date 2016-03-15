var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    userIdx: String,
	activity: String,
	place: String,
	meet: String,
	finish: String,
	msg: String,
	interest: [String]
});

module.exports = mongoose.model('Post', PostSchema);