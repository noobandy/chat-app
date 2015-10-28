var mongoose = require("mongoose");

var MessageSchema = mongoose.Schema({
	body : String,
	sentAt : Date,
	author : {
		type : mongoose.Schema.Types.ObjectId, ref : "User"
	}
});

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;