angular.module('doggyBook.services', [])

.factory('Auth', function ($http, $location, $window) {

  var signin = function (user) {
    console.log('in services.js auth factory: user: ', user);
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    //note that we might need to combine this with Prof.newProf below
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.doggyBook');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.doggyBook');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})

.factory('Prof', function ($http, $location, $window) {


  var showProf = function (userName='rj') {
    console.log('showProf services userName: ', userName)
    return $http({
      method: 'GET',
      url: '/profiles/' + userName

    })
    .then(function (resp) {
      console.log('response data in Prof factory: ', resp);
      return resp;
    });
  };

  return {
    showProf: showProf
  };
})


.factory('Search', function ($http, $location, $window) {

  var getAllUsers = function (query) {
    //this function should query all profs from DB, send to search.html and
    return $http({
      method: 'POST',
      url: '/api/search',
      data: query
    })
    .then(function (resp) {
      console.log('in Search factory, http request resolved');
      return resp;
    });
  };

  return {
    getAllUsers: getAllUsers
  };
})

.factory('Landing', function ($http, $location, $window) {
  var landingFunc = function () {
    //this function should just allow for rerouting between other
    return $http({
      method: 'GET',
      url: '/api/search',
      data: query
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    landingFunc: landingFunc
  };
});
