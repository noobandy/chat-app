var mongoose = require("mongoose");

var InboxSchema = mongoose.Schema({
	owner : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "User"
	},
	messages : [{
		message : {
			type : mongoose.Schema.Types.ObjectId,
			ref : "Message"
		},
		conversation : {
			type : mongoose.Schema.Types.ObjectId,
			ref : "Conversation"
		}
	}]
});


var Inbox = mongoose.model("Inbox", InboxSchema);

module.exports = Inbox;