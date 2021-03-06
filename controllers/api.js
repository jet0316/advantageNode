var User = require('../models/user.js');
var Quote = require('../models/quote.js');
var Order = require('../models/order.js');
var Pricelist = require('../models/priceList.json');

// console.log(Pricelist)
var apiController = {
	getUser: function(req, res){
		res.send(req.user)
	},

	getUserOrder: function(req, res){
		console.log('Q - ', req.query)
		Order.findOne({_id: req.query.id}).populate('quote user').exec(function(err, order){
			res.send(order)
		})
	},

	getOrder: function(req, res){
		Order.find({}).populate('quote user').exec(function(err, orders){
			res.send(orders)
		})
		
	},

	getHomeOrder: function(req, res){
		Order.find({user: req.query.id}).populate('quote user').exec(function(err, order){
			res.send(order)
		})
	},

	
	createQuote: function(req, res){
		var shirts = req.body.shirts
		var location = req.body.locations
		var priceArr = []
		var total = 0



		location.forEach(function(location){
		var color = location.colors
			for (var i = 0; i < Pricelist.length; i++) {

				if((shirts >= Pricelist[i].shirtCountLow) && (shirts <= Pricelist[i].shirtCountHigh) 

					&& (color === Pricelist[i].shirtColor)){

						var output = priceArr.push(Pricelist[i].shirtPrice)
					
						return output

			
				}
			}
		})
		priceArr.forEach(function(element){
			var output = total += element * shirts
			return output
		})


		var newQuote = new Quote({
			name        : req.body.name,
			shirts      : shirts,
			shirtColor  : req.body.shirtColor,
			shirtStyle  : req.body.shirtStyle,
			locations	: location,
			price		: total
		});

		


		newQuote.save(function(err, quote){
			if(err) {

			}
			else {
				res.send(quote)	
			}
		})
	},
	newOrder: function(req, res){

		// var totalPrice = 

		console.log(req.body)
		var newOrder = new Order({
			quote     : req.body._id,
			user      : req.user._id,
			status 	  : 'In Review',
			dateShown : req.body.dateShown,
			date      : Date.now()
		})
		newOrder.save(function(err, order){
			res.send(order)
			})
	},
	
	deleteOrder : function(req, res){
		Order.remove({ _id: req.params.id }, function(err, response) {
			Order.find({ user : req.user._id}).populate('quote user').exec(function(err, orders){
    		res.send(orders);
			})
		});
	},

	deleteQuote : function(req, res){
		
		Quote.remove({ _id: req.params.id }, function(err, response) {
			res.send(response)
		});
	},

	deleteMasterOrder : function(req, res){
		Order.remove({ _id: req.params.id }, function(err, response) {
			Order.find({}).populate('quote user').exec(function(err, orders){

    		res.send(orders);
			})
		});
	},

	updateStatus: function(req, res) {
		console.log(req.body.status)
		Order.update({_id: req.params.id}, {$set: {status: req.body.status}}, function(err, response){

			Order.find({}).populate('quote user').exec(function(err, orders){

    		res.send(orders);
    		console.log(orders)
			})
		})
	},
}

module.exports = apiController;









