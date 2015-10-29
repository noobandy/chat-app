var express = require("express");
var path = require("path");
var User = require(path.join(__dirname, "../models/User.js"));

var router = express.Router();
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
//get all users
router.get("/users", function(req, res, next) {
	User.find({}, function(error, docs) {
		if(error) {
			return next(error);
		}
		console.log(docs);
		res.json(docs);
	});
});

//get one user by username
router.get("/users/:username", function(req, res, next) {
	User.findOne({username : req.params.username}, function(error, doc) {
		if(error) {
			return next(error);
		}

		if(doc) {
			res.json(doc);
		} else {
			//not found
			return next("route");
		}
	});
});

//create new user
router.post("/users", function(req, res, next) {
	var data = req.body;
	data.avatar = data.avatar ? data.avatar : "/public/images/avatars/"+randomInt(0,2)+".gif";
	
	var promise = User.create(data);
	promise.then(function(newUser) {
		res.json(newUser);
	}, function(error) {
		return next(error);
	});
});

//update user
router.put("/users/:username", function(req, res, next) {
	User.findOne({username : req.params.username}, function(error, user) {
		if(error) {
			return next(error);
		}

		if(user) {
			user.username = req.body.username;

			user.save(function(error, user) {
				if(error) {
					return next(error);
				} 

				res.json(user);
			})
			
		} else {
			return next("route");
		}

	});
});

//delete user
router.delete("/users/:username", function(req, res, next) {
	User.findOne({username : req.params.username}, function(error, user) {
		if(error) {
			return next(error);
		}

		if(user) {
			user.remove(function(error, user) {
				if(error) {
					return next(error);
				} 

				res.json(user);
			})
			
		} else {
			return next("route");
		}

	});
});


module.exports = router;