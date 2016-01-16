angular.module('dataCache', ['HandleRequests'])
  .factory('DataCache', ['$rootScope', '$state', function($rootScope, $state, SendRequest) {
    var memberNames = [];
    var repNamesByLoc = '';
    var zipSearchReps = [];

    return {
      memberNames: memberNames,
      repNamesByLoc,
      zipSearchReps: zipSearchReps
    };

  }]);