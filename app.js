// We have to require all of this for passport
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport.js');


// Requiring our controllers that manage what happens to the database
var apiController = require('./controllers/api.js')
var indexController = require('./controllers/index.js');
var authenticationController = require('./controllers/authentication.js');

// connect to mongoose to name your database advantage
mongoose.connect('mongodb://localhost/advantage');

// configuring what and where your views are. and where your static files are at.
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/client'));

// these make anything coming back look legible
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// more passport stuff
app.use(cookieParser());
app.use(flash());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

// initializing a passport session
app.use(passport.initialize());

app.use(passport.session());


// Passport routes
app.post('/login', authenticationController.processLogin);


app.post('/signup', authenticationController.processSignup);


app.get('/logout', authenticationController.logout);


// Single page being rendered, all other views are passed through by the templates route below. see client/JavaScript/angular.js to see how
app.get('/', indexController.index);

// route coming from angular to get templates
app.get('/templates/:templatename', function(req, res){
	res.render('templates/' + req.params.templatename)
})

// route to get the users information
app.get('/api/user', apiController.getUser);

// route for when a quote is created
app.post('/api/quote', apiController.createQuote)

// route for when an order is submitted
app.post('/api/newOrder', apiController.newOrder);

// route to get all the orders in the database
app.get('/api/getOrder', apiController.getOrder);

// route to get a single order for the order confirmation page
app.get('/api/getUserOrder', apiController.getUserOrder);

// route to get all user orders
app.get('/api/getHomeOrder', apiController.getHomeOrder);

// route for user to delete order
app.delete('/api/delete/:id', apiController.deleteOrder);

// route for admin to delete order
app.delete('/api/deletemaster/:id', apiController.deleteMasterOrder);

app.delete('/api/deleteQuote/:id', apiController.deleteQuote);

// route to update the status of an order
app.post('/api/updateStatus/:id', apiController.updateStatus);

// We would need this if we werent using angular. you put all your user authenticated  routes after this
app.use(passportConfig.ensureAuthenticated);


// the port were listening on
var server = app.listen(5687, function() {
	console.log('Express server listening on port ' + server.address().port);
});
