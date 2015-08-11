var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport.js');

var apiController = require('./controllers/api.js')
var indexController = require('./controllers/index.js');
var authenticationController = require('./controllers/authentication.js');

mongoose.connect('mongodb://localhost/advantage');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/client'));
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

// Post received from submitting the login form
app.post('/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/logout', authenticationController.logout);

// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()
app.get('/templates/:templatename', function(req, res){
	res.render('templates/' + req.params.templatename)
})

app.get('/', indexController.index);




app.get('/api/user', apiController.get);




app.use(passportConfig.ensureAuthenticated);

app.get('/templates/:templatename', function(req, res){
	res.render('templates/' + req.params.templatename)
})

app.get('/user', indexController.index);

// app.get('/api/user', apiController.get)

var server = app.listen(5687, function() {
	console.log('Express server listening on port ' + server.address().port);
});
