var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var passport = require('passport');
const leaderRouter=require("./routes/leaderRouter");
var config = require('./config');
const dishRouter=require("./routes/dishRouter");
const PromoRouter=require("./routes/promoroyter");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');
var FileStore = require('session-file-store')(session);

var app = express();

app.use(passport.initialize());


const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));



var authenticate = require('./authenticate');




app.use("/dish",dishRouter);
app.use("/promo",PromoRouter);
app.use("/leader" ,leaderRouter);
app.use(express.static(path.join(__dirname, 'public')));




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
