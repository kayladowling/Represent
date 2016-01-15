angular.module('Directives').directive('svgMap',['$compile', function($compile){
  return {
    restrict: 'A',
    templateUrl: './images/BLANK_US_Map.svg',
    link: function(scope, element, attrs){

    }
  }
}]);