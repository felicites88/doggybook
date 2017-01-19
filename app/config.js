var path = require(path);
var knex = require('knex')({
  client: 'mysql'
  connection: {
    // may not be correct, check on during deploy
    filename: path.join(__dirname, '../db/doggysql.mysql');
  },
  useNullAsDefault: true;
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users')
.then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('email', 100).unique();
      user.string('password', 100);
      user.string('name', 100);
      user.boolean('isDog');
      user.timestamps();
    }).then(function(table) {
      console.log('Created Table: ', table);
    });
  }
});

db.knex.schema.hasTable('dogs')
.then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('dogs', function(dog) {
      // structure of dog db object to be fleshed out further
      dog.increments('id').primary();
      dog.string('name');
      dog.integer('userId', 100);
      dog.timestamps();
    }).then(function(table) {
      console.log('Created Table: ', table);
    });
  }
});

db.knex.schema.hasTable('walker')
.then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('walker', function(walker) {
      // structure of walker db object to be fleshed out further
      walker.increments('id').primary();
      walker.string('name');
      walker.integer('userId', 100);
      walker.timestamps();
    }).then(function(table) {
      console.log('Created Table: ', table);
    });
  }
});

module.exports = db;