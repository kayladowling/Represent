angular.module('Register', [])
.controller('RegisterController', ['$http', '$scope', function($http, $scope){
  $scope.user = {};
  $scope.register = function(user){
    $http({
      method: 'POST',
      url: '/auth/register',
      data: user
    }).success(function(data){
      localStorage.setItem('loginKey', data._id);
      localStorage.setItem('searchCache', JSON.stringify(data.searchCache));
<<<<<<< HEAD
      localStorage.setItem('zip', data.zip)
      // console.log(data.searchCache);
=======
>>>>>>> code cleanup - console.logs
      window.location.href = '/';
    });
  };
}]);