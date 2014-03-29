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
  controller('listArticlesCtrl', function($scope, $http) { 
    $http({
      method : 'GET',
      url : '/api/articles/list'
    }).
    success(function (data, status, headers, config) { 
      $scope.articles = data.articles;
    }).
    error(function (data, status, headers, config) { 
      $scope.articles = 'Error!';
    });
  }).
  controller('getArticleCtrl', function ($scope, $http) {

    $http({
      method : 'GET',
      url: '/api/article',
      params: '?id=''                                   // just hardcode default article ID here, fuck it
    })
    .success(function (data, status, headers, config) { 
      $scope.conversations = data.conversations;
      $scope.comments = data.comments;
      $scope.article = data.article;
    })
    .error(function (data, status, headers, config) { 
      $scope.conversations = 'Error!';
      $scope.article = 'Error!';
    });

  })/*.
  controller('postCommentCtrl', function ($scope, $http) {
    
    $http({
      method : 'POST',
      url: '/api/article/c
    })

  });*/.
