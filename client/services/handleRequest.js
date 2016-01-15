angular.module('HandleRequests', [])
  .factory('SendRequest', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {

    // var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';

  var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';
  // $http({
  //   method: 'GET',
  //   url: 'http://www.google.com/'
  // })
  // .then(function(res) {
  //   console.log(res);
  // });

  SendRequest.getRequest('https://congress.api.sunlightfoundation.com/legislators/locate?zip=55114&apikey=d8e5e25b4d66407a93160dc96026f987')
    .success(function(data) {
      console.log(data);
    })
    .error(function(error) {
      console.log(error);
    });

    SendRequest.getRequest("http://ipinfo.io")
    .success(function(data) {
      console.log(data);
    })
    .error(function(error) {
      console.log(error);
    });

//     $.get("http://ipinfo.io", function (response) {
//     $("#ip").html("IP: " + response.ip);
//     $("#address").html("Location: " + response.city + ", " + response.region);
//     $("#details").html(JSON.stringify(response, null, 4));
// }, "jsonp");

    var getRequest = function(url) {
      return $http({
        method: 'GET',
        url: url
      });
    };

    var postRequest = function(url, data) {
      return $http({
        method: 'POST',
        url: url,
        data: data
      });
    };


    return {
      getRequest: getRequest,
      postRequest: postRequest,
      get: getRequest,
      post: postRequest
    };
  }]);