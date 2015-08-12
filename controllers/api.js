var User = require('../models/user');

var apiController = {
	get: function(req, res){
		console.log(req.user)
		res.send(req.user)
	},
}

module.exports = apiController;