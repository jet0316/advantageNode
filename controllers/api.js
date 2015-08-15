var User = require('../models/user.js');
var Quote = require('../models/quote.js');
var Order = require('../models/order.js');
// var Pricelist = require('../models/priceList.json')

var apiController = {
	getUser: function(req, res){
		// console.log(req.user)
		res.send(req.user)
	},

	getUserOrder: function(req, res){
		Order.findOne({}).populate('quote user').exec(function(err, order){
			res.send(order)
		})
	},

	getOrder: function(req, res){
		Order.find({}).populate('quote user').exec(function(err, orders){
			res.send(orders)
		})
		
	},

	createOrder: function(req, res){
		var newOrder = new Order({
			name  : req.body.name,
			// quote : 
			user : req.user._id
		})
	},
	
	createQuote: function(req, res){
		var shirts = req.body.shirts
		var location = req.body.locations
		// var 
		// var price = Pricelist 
		console.log(location)

		var newQuote = new Quote({
			name        : req.body.name,
			shirts      : shirts,
			locations	: location,

			// price		: Number,
			user		: req.user._id
		});

		console.log(newQuote)


		newQuote.save(function(err, order){
			if(err) {

			}
			else {
				res.send(order)	
			}
		})
	},

}

module.exports = apiController;