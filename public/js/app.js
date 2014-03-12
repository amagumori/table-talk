'use strict';

// Declare app level module which depends on filters, and services

angular.module('tableTalk', [
  'tableTalk.controllers',
  'tableTalk.filters',
  'tableTalk.services',
  'tableTalk.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/comment', {
      templateUrl: 'partials/comment',
      controller: 'commentCtrl'
    }).
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/comment'
    });

  $locationProvider.html5Mode(true);
});
