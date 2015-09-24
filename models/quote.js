var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
	colors       : Number,
	printColor   : [String],
	artFile      : String,
	locationName : String,
});

var quoteSchema = mongoose.Schema({
	name 		: {type : String, default : 'No Name'},
	shirts      : Number,
	shirtColor  : String,
	shirtStyle  : String,
	locations	: [locationsSchema],
	price		: Number,
	
});

var Quotes = mongoose.model('quotes', quoteSchema);

module.exports = Quotes;
