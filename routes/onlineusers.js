var express = require("express");
var router = express.Router();
var path = require("path");

var User = require(path.join(__dirname, "../models/User.js"));

router.get("/onlineusers", function(req, res, next) {
	var now = new Date();

	var oneMinuteBeforeNow = now.getTime() - (60 * 1000);

	User.find({lastActiveTimeStamp :  { $gte : oneMinuteBeforeNow } }, function(error, docs) {
		if(error) next(error);

		res.json(docs);
	});
});

module.exports = router;