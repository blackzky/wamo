
/**
 * Module dependencies.
 */

var express = require('express')
  , place = require('./routes/place')
  , everyauth = require('everyauth') //everyauth
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');
mongoose.connect('mongodb://wamo.dev/test');

everyauth.debug = true;

var app = express();


//Facebook authentication
var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

var usersByFbId = {};

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

everyauth
  .facebook
    .appId("398061643641199")
    .appSecret("967a1451340453a6458be77e2d90ef13")
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
      return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    })
    .redirectPath('/');


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
app.use(everyauth.middleware(app));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes
app.get('/', place.portal);
app.get('/arena', place.arena);
app.get('/armory', place.armory);
app.get('/market', place.market);
app.get('/academy', place.academy);
app.get('/waiting', place.waiting);
app.get('/battlefield', place.battlefield);

//temp
app.get('/users', function(req, res){
	console.log(usersByFbId);
	data = {title: "login", users: usersByFbId};
	res.render("portal", data);	
});




var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
	console.log("saved");
  if (err) // ...
  console.log('meow');
});


Cat.find(function (err, kittens) {
		console.log(kittens);
		console.log("---");
  if (err)
  console.log(kittens)
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
