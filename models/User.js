var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
	username : {
		type: String,
		required : true
	},
	avatar : {
		type : String
	},
	lastActiveTimeStamp : {
		type : Number
	}
});



var User = mongoose.model("User", UserSchema);

module.exports = User;