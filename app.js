
/**
 * Module dependencies.
 */

var express = require('express');
var http 	= require('http'),
	path 	= require('path'),
	app		= express(),
	mongoose=require("mongoose"),
	server 	= http.createServer(app);

var requirejs = require('requirejs');
//var home 	= require('./controllers/home');



app.configure(function(){
	app.set('mongoUri', process.env.MONGOLAB_URI || 'mongodb://localhost/dbthankyou');
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	requirejs.config({
	    baseUrl: './controllers',
	    nodeRequire: require
	});
});


var home = requirejs('home'),
	user = requirejs('user'),
	login=requirejs('login');
module.exports = function () {};


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//rutas
app.use(home);
app.use(user);
app.use(login);



mongoose.connect(app.get('mongoUri'), function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
