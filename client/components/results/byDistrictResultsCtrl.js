angular.module('ByDistrictResults', ['HandleRequests', 'dataCache'])
  .controller('ByDistrictResultsController', ['$scope', 'SendRequest', '$rootScope', 'DataCache', 
    function($scope, SendRequest, $rootScope, DataCache) {

      $scope.getAllReps = DataCache.zipSearchReps;
      $scope.state = $scope.getAllReps[0].state_name;


  }]);