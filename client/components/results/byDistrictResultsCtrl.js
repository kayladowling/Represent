angular.module('ByDistrictResults', ['HandleRequests'])
  .controller('ByDistrictResultsController', ['$scope', 'SendRequest', '$rootScope', function($scope, SendRequest, $rootScope) {

    SendRequest.getRepsByUserLoc().then(function(reps) {
      $scope.getAllReps = reps;
      $scope.state = reps[0].state_name;
    });


  }]);