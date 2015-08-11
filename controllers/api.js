var User = require('../models/user');

var apiController = {
	get: function(req, res){
		User.findOne({}, function(err, user){
			res.send(user)
		});
	},
}

module.exports = apiController;