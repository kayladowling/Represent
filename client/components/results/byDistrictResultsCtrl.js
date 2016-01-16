

angular.module('ByDistrictResults', ['HandleRequests'])
.controller('ByDistrictResultsController', ['$scope', 'SendRequest', '$rootScope', function($scope, SendRequest, $rootScope) {

    $scope.states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FL": "Florida",
    "GA": "Georgia",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
  };


// $scope.isDistReps = function(data) {
//   return data.title = "Rep";
// };
// $scope.isDistSens = function(data) {
//   return data.title = "Sen";
// };
SendRequest.getRepsByUserLoc().then(function(reps)  {
        $scope.getAllReps = reps;
        // $scope.distSens = $scope.isDistReps(reps);
        // $scope.distReps = $scope.isDistSens(reps);
        // console.log($scope.distReps);
        $scope.state = reps[0].state;  
  });


}]);
