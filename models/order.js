var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	quote			 : [{type : mongoose.Schema.ObjectId, ref : 'quotes'}],
	user		     : {type : mongoose.Schema.ObjectId, ref : 'user'},
	status 			 : String,
	dateShown		 : String,
	date 			 : {type : Number}
});

var Order = mongoose.model('orders', orderSchema);

module.exports = Order;

