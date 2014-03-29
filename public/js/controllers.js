'use strict';

/* Controllers */

angular.module('tableTalk.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/'
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
      params: {id : 'AASDKJH12837192' }
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
  }).
  controller('signupCtrl', function($scope, $http) { 

    $scope.submit = function(user) { 
      $scope.signupUser = angular.copy(user);
    }

    $http({
      method: 'POST',
      url: '/api/users/'
    })
    .success(function (data, status, headers, config) { 
      // do angular login stuff here
    })
    .error(function (data, status, headers, config) { 
 
    }); 
  }).
  controller('loginCtrl', function($scope, $http) { 

    $scope.login = function(user) { 
      $scope.loginUser = angular.copy(user);
    }
    // how do we auth users?
    $http({
      method: 'POST',
      url: '/api/users/'
    })
    .success(function (data, status, headers, config) { 
      // do angular login stuff here
    })
    .error(function (data, status, headers, config) { 
 
    }); 
  }).
  controller('convoCtrl', function ($scope, $http) {
    
    $http({
      method : 'POST',
      url: '/api/articles/',
      params: { articleID : '', userID : '' }
    })
    .success(function (data, status, headers, config) { 

    })
    .error(function (data, status, headers, config) { 

    });
  }).
  controller('commentCtrl', function ($scope, $http) {
    $http({
      method : 'POST',
      url: '/api/articles/',
      params: { convoID: '', userID : '' }
    })
    .success(function (data, status, headers, config) { 

    })
    .error(function (data, status, headers, config) { 

    });
  });
