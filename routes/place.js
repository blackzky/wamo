
exports.portal = function(req, res){
	data = {title: "Portal", username: req.loggedIn ? req.user.login : null};
	res.render("portal", data);
};

exports.arena = function(req, res){
	res.send("arena");
};

exports.armory = function(req, res){
	res.send("armory");
};

exports.market = function(req, res){
	res.send("market");
};

exports.academy = function(req, res){
	res.send("academy");
};

exports.waiting = function(req, res){
	res.send("waiting room");
};

exports.battlefield= function(req, res){
	res.send("battle field");
};
