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


app.get('/templates/:templatename', function(req, res){
	console.log(req.params.templatename)
	res.render('templates/' + req.params.templatename)
})

app.get('/', indexController.index);


app.get('/api/user', apiController.get);

app.post('/api/order', apiController.order)


app.use(passportConfig.ensureAuthenticated);


// app.get('/api/user', apiController.get)

var server = app.listen(5687, function() {
	console.log('Express server listening on port ' + server.address().port);
});
