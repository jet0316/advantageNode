var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
	colors       : Number,
	artFile      : String,
	locationName : String,
});

var quoteSchema = mongoose.Schema({
	name 		: {type : String, default : 'No Name'},
	shirts      : Number,
	locations	: [locationsSchema],
	price		: Number,
	
});

var Quotes = mongoose.model('quotes', quoteSchema);

module.exports = Quotes;
