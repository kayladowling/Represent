angular.module('Search', [])
.controller('SearchController',['$scope', '$rootScope', '$state', 'SendRequest', function($scope, $rootScope, $state, SendRequest){

  var self = this;

  self.names = loadData();
  $scope.query = query;

  function query(text) {
   var result = text ? self.names.filter(nameFilter(text)) : self.names;
   return result;
  }

  function loadData() {
    var testNames = 'Auggie Hudak, Chris Clark, Matt Hand, Kayla Dowling, Zac Delventhal';


    return testNames.split(/, +/g).map(function (name) {
      return {
        value: name.toLowerCase(),
        display: name
      };
    });
  }
  
  function nameFilter(query) {
    var lowercase = angular.lowercase(query);

    return function filter (name) {
      return (name.value.indexOf(lowercase) === 0);
    };
  }

}]);