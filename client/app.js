angular.module('CongressionalStalker', [
  'Search',
  'Results',
  'ui.router',
  'ui.materialize',
  'ngMaterial',
  'Register',
  'Login',
  'Logout',
  'HandleRequests',
  'Directives',
  'ByState',
  'ByStateResults',
  'DlFilters',
  'ByDistrictResults',
  'dataCache',
  'errors'
])

.factory('stateFactory', function(){
  var loginCheck = function(){
    return localStorage.getItem('loginKey') !== null;
  };
  var searchCacheCheck = function(){
    return JSON.parse(localStorage.getItem('searchCache')).length > 0;
  };
  return {
    loginCheck: loginCheck,
    searchCacheCheck: searchCacheCheck,
  }
})

.controller('AuthCheck', function($scope, stateFactory){
  stateFactory.loginCheck = function(){
    return localStorage.getItem('loginKey') !== null;
  };
  stateFactory.searchCacheCheck = function(){
    return JSON.parse(localStorage.getItem('searchCache')).length > 0;
  };
})

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'components/search/searchView.html',
      controller: 'SearchController'
    })
    .state('results', {
      url:'/results',
      templateUrl: 'components/results/resultsView.html',
      controller: 'ResultsController'
    })
    .state('auth', {
      url: '/api/auth',
      templateUrl: 'auth/login.html',
      controller: 'LoginController'
    })
    .state('login', {
      url: '/api/login',
      templateUrl: 'auth/login.html',
      controller: 'LoginController'
    })
    .state('register', {
      url: '/api/register',
      templateUrl: 'auth/register.html',
      controller: 'RegisterController'
    })
    .state('logout', {
      url: '/api/logout',
      templateUrl: 'auth/logout.html',
      controller: 'LogoutController'
    })
    .state('byState', {
      url:'/api/byState',
      templateUrl: 'components/search/byState.html',
      controller: 'ByStateController'
    })
    .state('byStateResults', {
      url:'/api/byState/results',
      templateUrl: 'components/results/byStateResults.html',
      controller: 'ByStateResultsController'
    })
    .state('byDistrictResults', {
      url:'/byDistrictResults/results',
      templateUrl: 'components/results/byDistrictResults.html',
      controller: 'ByDistrictResultsController'
    });
}])

.run(function($rootScope){
  var updateSearchCache = function(){
    return JSON.parse(localStorage.getItem('searchCache'));
  };
  $rootScope.$on('$stateChangeStart', function(){
    if(localStorage.getItem('searchCache')){
      $rootScope.searchCache = updateSearchCache();
    }
  });
});