angular.module('dataCache', ['HandleRequests'])
  .factory('DataCache', ['$rootScope', '$state', function($rootScope, $state, SendRequest) {
    var memberNames = [];
    var repNamesByLoc = '';

    return {
      memberNames: memberNames,
      repNamesByLoc
    };

  }]);