angular.module('Search', [])
.controller('SearchController',['$scope', '$rootScope', '$state', 'SendRequest', function($scope, $rootScope, $state, SendRequest){

  var self = this;

  loadData();
  $scope.query = query;

  function query(text) {
   var result = text ? self.names.filter(nameFilter(text)) : self.names;
   return result;
  }

  // Expecting back an array of the full names of all members of congress 
  function loadData() {
    var url = '/api/allMembers';
    SendRequest.getRequest(url)
      .then(function(response) {
        var names = response.data;
        self.names = names.map(function(name) {
          // Splitting the names into lower case here to more easily filter below
          return {
            value: name.toLowerCase(),
            display: name
          }
        });
      });
  }
  
  function nameFilter(query) {
    var lowercase = angular.lowercase(query);

    return function filter (name) {
      return (name.value.indexOf(lowercase) === 0);
    };
  }

}]);