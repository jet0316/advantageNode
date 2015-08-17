var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	quote			 : [{type : mongoose.Schema.ObjectId, ref : 'quotes'}],
	user		     : {type : mongoose.Schema.ObjectId, ref : 'user'},
	status 			 : String,
	date			 : {type : Date}
});

var Order = mongoose.model('orders', orderSchema);

module.exports = Order;

