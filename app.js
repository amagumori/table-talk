var express = require('express'),
  http = require('http'),
  path = require('path'),
  jwt = require('express-jwt'),
  fs = require('fs'),
  mongoose = require('mongoose')

var app = module.exports = express();

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test';

mongoose.connect(mongoUri)

var models_path = __dirname + '/backend/models'
  fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require (models_path + '/' + file)
})

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

require('./routes/routes')(app, jwt);

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

app.use('/api', jwt({ secret : 'secret' }));
app.use(express.json());
app.use(express.urlencoded());

/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
