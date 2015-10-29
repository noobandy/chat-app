var path = require("path");
var express = require("express");
var User = require(path.join(__dirname, "../models/User.js"));
var router = express.Router();

router.post("/heartbeat", function(req, res, next) {
	var username = req.body.username;

	User.findOne({username : username}, function(error, user) {
		if(error) next(error);

		if(user !== null) {
			var now = new Date();
			user.lastActiveTimeStamp = now.getTime();
			user.save(function(error, user) {
				res.send();
			});
		} else {
			//not found
			next("route");
		}
	});
});

module.exports = router;