var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	name             : String,
	quote			 : [{type : mongoose.Schema.ObjectId, ref : 'quotes'}],
	price			 : Number,
	user		     : {type : mongoose.Schema.ObjectId, ref : 'user'}
});

var Order = mongoose.model('orders', orderSchema);

module.exports = Order;

