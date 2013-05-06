
/**
 * Module dependencies.
 */

var express = require('express')
  , place = require('./routes/place')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('words and magic: online'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', place.portal);
app.get('/arena', place.arena);
app.get('/armory', place.armory);
app.get('/market', place.market);
app.get('/academy', place.academy);
app.get('/waiting', place.waiting);
app.get('/battlefield', place.battlefield);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
