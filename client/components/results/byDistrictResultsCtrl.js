angular.module('ByDistrictResults', ['HandleRequests', 'dataCache'])
  .controller('ByDistrictResultsController', ['$scope', 'SendRequest', '$rootScope', 'DataCache',
    function($scope, SendRequest, $rootScope, DataCache) {
      $scope.getVotes = $rootScope.getMemberAndVotes;
      $scope.getAllReps = DataCache.zipSearchReps;
      console.log($scope.getAllReps);
      $scope.state = $scope.getAllReps[0].state_name;
      $scope.fullname = $scope.getAllReps.first_name + ' ' + $scope.getAllReps.last_name;

      $scope.party = {
        'R': 'Republican',
        'D': 'Democrat'
      }
      $scope.getDistrict = function() {
        var result;
        $scope.getAllReps.forEach(function(data) {
          if (data.district) {
            result = data.district;
          }
        });
        return result;
      }

      $scope.district = $scope.getDistrict();
      console.log($scope.district);
    }
  ]);