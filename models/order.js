var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	name             : String,
	shirts	         : Number,
	locations        : Number,
	colors			 : Number,
	userID			 : String
});

var Order = mongoose.model('orders', orderSchema);

module.exports = Order;

