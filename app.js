var express = require('express'),
  http = require('http'),
  path = require('path')

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

require('./routes/routes')(app);

app.use(express.cookieParser('this is supposed to be secret'))

app.use(express.cookieSession({
  secret : "changethis",
  cookie: { 
    maxAge: 14400000
  }
}));

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}

/**
 * Routes
 */
/*
// serve index and view partials
app.get('/', routes.index);
app.get('/index2', routes.index2);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);

// test docx
app.get('/docx', routes.docx);
*/

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
