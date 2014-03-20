'use strict';

/* Controllers */

angular.module('tableTalk.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
      $scope.comments = data.comments;
      $scope.article = data.article;
      $scope.set_pos = function(obj) { 
        return { top : obj['offset'] }
      }
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
  controller('commentCtrl', function($scope, $http) {
    
  });
