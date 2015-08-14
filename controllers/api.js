var User = require('../models/user');
var Order = require('../models/order');

var apiController = {
	getUser: function(req, res){
		console.log(req.user)
		res.send(req.user)
	},
	placeOrder: function(req, res){
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
	},
	getUserOrder: function(req, res){
		Order.findOne({}, function(err, orders){
			res.send(orders)
		})
	},
	getOrder: function(req, res){
		Order.find({}, function(err, orders){
			res.send(orders)
		})
	},
}

module.exports = apiController;