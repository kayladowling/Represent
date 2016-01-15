angular.module('HandleRequests', [])

.factory('SendRequest', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {

  // Objects for holding API routes and keys.
  var nytimes = {
    host: '//api.nytimes.com/svc/politics/v3/us/legislative/congress/',
    key: 'dab50f4c71783810c9a7c1f132ef3136:5:73959417'
  };
  var sunlight = {
    host: 'https://congress.api.sunlightfoundation.com/legislators/',
    key:'d8e5e25b4d66407a93160dc96026f987'
  };
  var ipinfo = {
    host: 'http://ipinfo.io'
  };

  // Basic get and post methods.
  var get = function(url) {
    console.log('Sending GET to', url);
    return $http({
      method: 'GET',
      url: url
    });
  };
  var post = function(url, data) {
    console.log('Sending POST to', url, 'with data:', data);
    return $http({
      method: 'POST',
      url: url,
      data: data
    });
  };

  // Export object, with basic get and post methods.
  var factory = {};
  factory.get = get;
  factory.post = post;

  // Support for legacy API calls.
  factory.getRequest = get;
  factory.postRequest = post;


  // Returns an array of representatives for a given ZIP Code.
  factory.getRepsByZip = function(zip) {
    return get(sunlight.host + 'locate?zip=' + zip + '&apikey=' + sunlight.key)

    .then( function (response) {
      console.log ('Got representatives for ZIP:', zip);
      return response.data.results;

    }, function (error) {
      return console.log(error);
    });
  };


  // Returns an array of representatives fom a guess at the user's location by IP.
  factory.getRepsByUserLoc = function () {
    return get(ipinfo.host)

    .then( function (response) {
      var coords = response.data.loc.split(',');
      return get(sunlight.host + 'locate?latitude=' + coords[0] + '&longitude=' + coords[1] + '&apikey=' + sunlight.key)
      
      .then(function (response) {
        console.log('Got representatives for lat:', coords[0], 'and long:', coords[1]);
        return response.data.results;

      }, function (error) {
        return console.log(error);
      });

    }, function (error) {
      return console.log(error);
    });
  };


  return factory;
}]);