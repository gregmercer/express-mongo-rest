/**
 * Module dependencies.
 */
var express = require('express');
var app = module.exports = express.createServer();

var port = process.env.PORT || 3000;

// Configuration
var pub = __dirname + '/public';

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(pub));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var PersonProvider = require('./personprovider').PersonProvider;
var PersonProvider = new PersonProvider();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
	res.send('Hello World');
});

app.get('/persons', function(req, res) { 
  PersonProvider.findAll(function(error, persons) {
  	//console.log('back from findAll');
  	//console.log(persons);
    res.send(persons);
  });
});

app.get('/persons/:id', function(req, res) {
  PersonProvider.findById(req.param('id'), function(error, person) {
  	console.log('back from findById');
  	console.log(person);
    res.send(person);
  });
});

app.post('/persons', function(req, res) {
  PersonProvider.save({
		firstname: req.param('firstname'),
    lastname: req.param('lastname'),
  }, function(error, docs) {
		res.send(req.body);
  });
});

app.put('/persons/:id', function(req, res) {
  PersonProvider.updateById(req.param('id'), req.body, function(error, person) {
    res.send(person);
  });
});

app.delete('/persons/:id', function(req, res) {
  PersonProvider.deleteById(req.param('id'), function(error) {
  	console.log('back from deleteById');
    res.send('');
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  
  app.listen(port);
  console.log("Express server listening on port %d", port);

}
