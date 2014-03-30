'use strict';

/* Directives */

angular.module('tableTalk.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).
  /* http://stackoverflow.com/questions/21211460/route-dependent-css-page-transitions-in-angularjs */
  /* maybe will use this, maybe will use the $rootScope.go() */
  directive('animClass', function($route) { 
    return {
      link : function(scope, elem, attrs) { 
        var enterClass = $route.current.animate;
        elem.addclass(enterClass);
        scope.on('$destroy', function() { 
          elem.removeClass(enterClass);
          elem.addClass($route.current.animate);
        })
      }
    }
  });
