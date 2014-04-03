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
    }).
    when('/login', {
      templateUrl: 'partials/login',
      controller: 'loginCtrl',
    }).
    when('/', {
      controller: 'indexCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});
/*
  $locationProvider.html5Mode(true);
  $rootScope.go = function(path, pageAnimationClass) { 
    if (typeof(pageAnimationClass) === 'undefined') { 
      $rootScope.pageAnimationClass = 'crossFade';
    }
    else { 
      $rootScope.pageAnimationClass = pageAnimationClass;
    }
    if (path === 'back') {
      $window.history.back();
    }
    else {
      $location.path(path);
    }
  };
*/
