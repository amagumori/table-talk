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
    when('/signup', {
      templateUrl: 'partials/signup',
      controller: 'signupCtrl', 
      animate: 'slideFromRight'
    }).
    when('/login', {
      templateUrl: 'partials/login',
      controller: 'loginCtrl',
      animate: 'slideFromRight'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

});
