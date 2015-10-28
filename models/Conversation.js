var mongoose = require("mongoose");

var ConversationSchema = mongoose.Schema({
	name : String,
	//only usefull for conversation b/w just two individuals (private) 
	//a_b_private is same as b_a_private
	channelId : String,
	participants : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : "User"
	}]
});

var Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;