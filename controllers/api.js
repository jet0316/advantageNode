var User = require('../models/user');
var Order = require('../models/order');

var apiController = {
	get: function(req, res){
		console.log(req.user)
		res.send(req.user)
	},
	order: function(req, res){
		var newOrder = new Order({
			name: req.body.name,
			shirts: Number,
			locations: Number,
			colors: Number,
			userID: req.user._id
		});


		newOrder.save(function(err, order){
			if(err) {

			}
			else {
				res.send(order)	
			}
		})
	}
}

module.exports = apiController;