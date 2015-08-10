var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport.js');


var indexController = require('./controllers/index.js');
var authenticationController = require('./controllers/authentication.js');

mongoose.connect('mongodb://localhost/advantage');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(flash());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()
app.use(passportConfig.ensureAuthenticated);

app.get('/', indexController.index);

var server = app.listen(5687, function() {
	console.log('Express server listening on port ' + server.address().port);
});
