var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
	color        : [Number],
	artFile      : String,
	locationName : String,
	price		 : Number


});

var quoteSchema = mongoose.Schema({
	shirts      : Number,
	locations	: [locationsSchema],
	price		: Number
	user		: {type : mongoose.Schema.ObjectId, ref : 'user'}

});

var Quotes = mongoose.model('quotes', orderSchema);

module.exports = Quotes;
