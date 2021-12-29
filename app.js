const createError = require('http-errors');
const express = require('express');
const hbs = require('express-hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

const relative = p => path.join(__dirname, p);

// view engine setup
const viewsDir = relative('views');

app.use(express.static(relative('public')));

// Hook in express-hbs and tell it where known directories reside
app.engine('hbs', hbs.express4({
  layoutsDir: relative('views/layout'),
  defaultLayout: relative('views/layout.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
