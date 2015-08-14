var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	name             : String,
	quote			 : [{type : mongoose.Schema.ObjectId, ref : 'quotes'}],
	user			 : {type : mongoose.Schema.ObjectId, ref : 'user'},
	price			 : Number
});

var Order = mongoose.model('orders', orderSchema);

module.exports = Order;

