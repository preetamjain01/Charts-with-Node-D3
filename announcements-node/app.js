var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var logger = require('morgan');
const DBService = require('./shared/db.service');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const { MONGOURL } = require('./shared/app-constants');

const app = express();



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var chartsRouter = require('./routes/chartsRouter');
var announcementRouter = require('./routes/announcementRouter');

var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

/*app.use(function(req, res, next) {
    if (req.method === 'OPTIONS') {
        console.log('!OPTIONS');
        let headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    } else {
        next();
    }
});*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.options("/*", function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.send(200);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/charts', chartsRouter);
app.use('/announcements', announcementRouter);

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

app.listen(port);
console.log("App listening on port 8080");



module.exports = app;
