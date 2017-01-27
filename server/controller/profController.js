console.log('loading... profController.js');

var db = require('../../app/config');

var User = require('../../app/models/user');
var Dog = require('../../app/models/dog');
var Walker = require('../../app/models/walker');

var Users = require('../../app/collections/users');
var Dogs = require('../../app/collections/dogs');
var Walkers = require('../../app/collections/walkers');

module.exports = {
  displayProf: function(req, res, next) {
    var username = req.params.username;
      var profile = {}
      // search the db for a particular username

      console.log('getting profile data for ' + username + '!');
      new User({username: username})
      .fetch()
      .then(function(user) {
        if (!user) {
          // if !found, do... something?
          console.log('user not found!');
          res.redirect('/'); // PLACEHOLDER
          // res.send();  // should probably send something else
        } else {
          // if found: grab the user profile data
          Object.assign(profile, user.toJSON());
          var userId = user.get('id');

          if (user.get('isDog') === 'Dog') {
            console.log('grabbing dog profile: ', userId);
            // console.log('from user model: ', user);
            new Dog({userId: userId}).fetch()
            .then(function(dog) {
              Object.assign(profile, dog.toJSON());
            })
            .then(function() {
              console.log('\nreturning: ', profile);
              delete profile.password;
              res.send(profile);
            });
          } else {
            new Walker({userId: userId}).fetch()
            .then(function(walker) {
              Object.assign(profile, walker.toJSON());
            })
            .then(function() {
              console.log('\nreturning: ', profile);
              delete profile.password;
              res.send(profile);
            });
          }
          // build a bookshelf query and search the appropriate table
          // res.redirect('/'); // PLACEHOLDER
          // console.log('\nreturning: ', profile);
          // res.send(profile);
        }
    });
  }
}

// checkAuth: function (req, res, next) {
//   var token = req.headers['x-access-token'];
//   if (!token) {
//     next(new Error('No token'));
//   } else {
//     var user = jwt.decode(token, 'secret');
//     findUser({username: user.username})
//       .then(function (foundUser) {
//         if (foundUser) {
//           res.send(200);
//         } else {
//           res.send(401);
//         }
//       })
//       .fail(function (error) {
//         next(error);
//       });
//
//   }
// }
