var mongoose = require('mongoose');
var db_url = process.env.MONGOLAB_URI || "mongodb://localhost/gmercer-rest";
mongoose.connect(db_url);

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Person = new Schema({
    firstname  : String
  , lastname   : String
  , created_at : Date
});

mongoose.model('Person', Person);
var Person = mongoose.model('Person');

PersonProvider = function(){};

// Find all persons
PersonProvider.prototype.findAll = function(callback) {
  Person.find({}, function (err, persons) {
    callback( null, persons );
  });  
};

// Find person by ID
PersonProvider.prototype.findById = function(id, callback) {
  Person.findById(id, function (err, person) {
    if (!err) {
      console.log(person);  
      callback(null, person);
    }
  });
};

// Update person by ID
PersonProvider.prototype.updateById = function(id, body, callback) {
  Person.findById(id, function (err, person) {
    if (!err) {
      person.firstname = body.firstname;
      person.lastname = body.lastname;
      person.save(function (err) {
        callback();
      });
    }
  });
};

// Delete person by ID
PersonProvider.prototype.deleteById = function(id, callback) {
  Person.findById(id, function (err, person) {
    if (!err) {
      person.remove(function (err) {
        callback();
      });
    }
  });
};

// Create a new person
PersonProvider.prototype.save = function(params, callback) {
  var person = new Person({firstname: params['firstname'], lastname: params['lastname'], created_at: new Date()});
  person.save(function (err) {
    callback();
  });
};

exports.PersonProvider = PersonProvider;