var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {Database} = require('./database');
var multer = require('multer');
const storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './public/images');
  },
  filename : function(req, file, cb){
    cb(null, file.originalname);
  }
});
const upload = multer({storage : storage})


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boatsRouter = require('./routes/boats');
var bookingsRouter = require('./routes/bookings');

var app = express();
var database = new Database();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.array('image', 1));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boats', boatsRouter);
app.use('/bookings', bookingsRouter);

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
