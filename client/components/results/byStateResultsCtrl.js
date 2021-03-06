angular.module('ByStateResults', ['HandleRequests'])
.controller('ByStateResultsController', ['$scope', 'SendRequest', '$rootScope', 'searchFactory', '$state', 'DataCache', function($scope, SendRequest, $rootScope, searchFactory, $state, DataCache) {
  $scope.getVotes = searchFactory.getMemberAndVotes;
  $scope.party = {
        'R': 'Republican',
        'D': 'Democrat'
    }
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

  $scope.getDistrictPage = function(district) {
    var reps = [];
    
    // Jenky work around for legacy code.
    $rootScope.byStateResults.forEach( function (rep) {
        if (rep.district === district) {
            rep.state_name = $scope.states[rep.state];
            rep.bioguide_id = rep.id;
            rep.title = 'Rep';
            reps.push(rep);
        }
    });
    $rootScope.byStateResults.forEach( function (rep) {
        if (rep.chamber === "senate") {
            rep.state_name = $scope.states[rep.state];
            rep.bioguide_id = rep.id;
            rep.title = 'Sen';
            reps.push(rep);
        }
    });
    console.log('REPS', reps);
    DataCache.zipSearchReps = reps;
    $state.go('byDistrictResults');
  };
}]);