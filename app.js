var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var basicAuth = require('basic-auth');
var utilities = require('./controllers/utilities');

var package_json = require('./package.json');
global.appVersion = package_json.version;

var indexRouter = require('./routes/index');
var bitcoinRouter = require('./routes/bitcoinRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var auth = function (req, res, next) {
  var user = basicAuth(req);
  console.log("Authentication: " + utilities.get_auth());
  if (utilities.get_auth() !== 'true') {
  	next();
	}
  else {
		if (!user || !user.name || !user.pass) {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			res.sendStatus(401);
			return;
		}
		if (user.name === utilities.get_user() && user.pass === utilities.get_password()) {
			next();
		} else {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			res.sendStatus(401);
			return;
		}
  }
}
 
app.use('/', auth, indexRouter);
app.use('/home/', auth, bitcoinRouter);
app.use('/bitcoin/', auth, bitcoinRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
