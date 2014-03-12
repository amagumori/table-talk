'use strict';

/* Directives */

angular.module('tableTalk.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
