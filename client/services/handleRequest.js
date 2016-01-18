angular.module('HandleRequests', [])

.factory('SendRequest', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {

  // Objects for holding API routes and keys.
  var nytimes = {
    host1: '//api.nytimes.com/svc/politics/v3/us/legislative/congress/',
    host2: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?',
    key1: 'dab50f4c71783810c9a7c1f132ef3136:5:73959417',
    key2: '9e933c5a73a0b893d8cfa826ef9d0a8b:7:74055917'
  };
  var sunlight = {
    host: 'https://congress.api.sunlightfoundation.com/legislators/',
    key:'d8e5e25b4d66407a93160dc96026f987'
  };
  var freegeoip = {
    host: 'https://freegeoip.net/json/'
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


  // Returns an array of representatives from a guess at the user's location by IP.
  factory.getRepsByUserLoc = function () {
    return get(freegeoip.host)

    .then( function (response) {
      var lat = response.data.latitude;
      var lon = response.data.longitude;
      return get(sunlight.host + 'locate?latitude=' + lat + '&longitude=' + lon + '&apikey=' + sunlight.key)
      
      .then(function (response) {
        console.log('Got representatives for lat:', lat, 'and long:', lon);
        return response.data.results;

      }, function (error) {
        return console.log(error);
      });

    }, function (error) {
      return console.log(error);
    });
  };

  factory.newsFeed = function (name) {
    return get(nytimes.host2 + 'q=' + name + '&api-key=' + nytimes.key2);
  };


  return factory;
}]);