'use strict';

/* Controllers */

angular.module('tableTalk.controllers', []).
  controller('viewCtrl', function ($scope) {
    $scope.$on("$routeChangeSuccess", function(event) {


    })
  }).

  controller('postArticleCtrl', function($scope, $http) { 
    $http({
      method : 'POST',
      url : '/api/articles'
      //params: { }
    }).
    success(function (data, status, headers, config) { 
      
      $scope.articles = data.articles;
    }).
    error(function (data, status, headers, config) { 
      $scope.articles = 'Error!';
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
      /* logic to split document into pages
      var pagesArr = []; 
      var splitPages = function(data['file'], data['pages']) {
        for (i=0; i<pages.length; i++) { 
          arr.push(data['file'].substring(pages[i]['offset'], (pages[i]['offset'] + pages[i]['length'])));
        }
      })
      $scope.articlePages = pagesArr;  */
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

  controller('indexCtrl', function ($scope, $http, $q, $rootScope) {

    var deferred = $q.defer();
    
    $http({
      method: 'GET',
      url: '/api/comments/'
    })
    .success(function (data, status, headers, config) { 
      var theData = data;
      $scope.comments = theData; // return JSON list of comment objects
      deferred.resolve(theData);
      // update scopes
      $rootScope.$$phase || $rootScope.$apply() || $scope.apply();
    })
    .error(function (data, status, headers, config) { 
 
    }); 

    $scope.processForm = function() {    
      $http({
        method : 'POST',
        url: '/api/conversations',
        data: $scope.newcomment
      })
      .success(function (data, status, headers, config) { 
        var comment = data;
        // hopefully will update scopes?
        $scope.comments.push(comment);
        $scope.$apply();
        console.log('successfully posted!!!!' + comment)
        console.log('comments: \n\n' + $scope.comments)
      })
      .error(function (data, status, headers, config) { 

      });
    };
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
