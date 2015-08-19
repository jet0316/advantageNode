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
app.use(bodyParser.json())

app.use(cookieParser());
app.use(flash());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());



app.post('/login', authenticationController.processLogin);


app.post('/signup', authenticationController.processSignup);


app.get('/logout', authenticationController.logout);

app.get('/', indexController.index);

app.get('/templates/:templatename', function(req, res){
	// console.log(req.params.templatename)
	res.render('templates/' + req.params.templatename)
})

app.get('/api/user', apiController.getUser);

app.post('/api/quote', apiController.createQuote)

app.post('/api/newOrder', apiController.newOrder);

app.get('/api/getOrder', apiController.getOrder);

app.get('/api/getUserOrder', apiController.getUserOrder);

app.get('/api/getHomeOrder', apiController.getHomeOrder);

app.post('/api/delete', apiController.delete);

app.use(passportConfig.ensureAuthenticated);


var server = app.listen(5687, function() {
	console.log('Express server listening on port ' + server.address().port);
});
