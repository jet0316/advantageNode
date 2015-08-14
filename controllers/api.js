var User = require('../models/user');
var Quote = require('../models/quote');

var apiController = {
	getUser: function(req, res){
		console.log(req.user)
		res.send(req.user)
	},
	createLocation: function(req, res){
		var newQuore = new Quote.locations({
			colors  : [Number],
			artfile : 
		});


		newOrder.save(function(err, order){
			if(err) {

			}
			else {
				res.send(order)	
			}
		})
	},

	createQuote: function(req, res){

	},

	getUserOrder: function(req, res){
		Order.findOne({}, function(err, orders){
			res.send(orders)
		})
	},

	getOrder: function(req, res){
		Order.find({username : req.params.userID}).populate('quote user').exec(function(err, response){
			res.send(response)
		})
		
	},

}

module.exports = apiController;