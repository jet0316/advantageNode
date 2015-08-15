var mongoose = require('mongoose');

var locationsSchema = mongoose.Schema({
	colors       : Number,
	artFile      : String,
	locationName : String,
});

var quoteSchema = mongoose.Schema({
	name 		: String,
	shirts      : Number,
	locations	: [locationsSchema],
	price		: Number,
	user		: {type : mongoose.Schema.ObjectId, ref : 'user'}

});

var Quotes = mongoose.model('quotes', quoteSchema);

module.exports = Quotes;
