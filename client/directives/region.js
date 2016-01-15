angular.module('Directives').directive('region',['$compile', function($compile){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope,element,attrs){
        scope.elementId = element.attr("id");
        scope.regionClick = function(){
          alert(scope.elementId);
        };
        element.attr("ng-click", "regionClick()");
        element.removeAttr('region');
        $compile(element)(scope);
      }
    }
  }]);