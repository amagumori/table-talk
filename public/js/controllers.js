'use strict';

/* Controllers */

var appControllers = angular.module('tableTalk.controllers', [])

/* HTTP REST SERVICES */

appControllers.factory("httpService", ['$http', '$log', function($http, $log) { 

  return {
    get: function() { 
      return $http({
        method : 'GET',
        url : '/api/comments'
      }).success(function(data, status, headers, config) { 

      }).error(function(data, status, headers, config) { 

      })
    },
    postComment: function (comment) { 
      $http({
        method : 'POST',
        url: '/api/conversations',
        data: comment
      })
      .success(function (data, status, headers, config) { 
        return data;
      })
      .error(function (data, status, headers, config) { 
        return status + headers;
      });
    },
    login: function() { 
      $http({
        method: 'POST',
        url: '/api/auth'
      })
      .success(function (data, status, headers, config) { 
        // do angular login stuff here
      })
      .error(function (data, status, headers, config) { 
   
      }); 
    },
    signup: function() { 
      $http({
        method: 'POST',
        url: '/api/users'
      })
      .success(function (data, status, headers, config) { 
        // do angular login stuff here
      })
      .error(function (data, status, headers, config) { 
   
      }); 
    }
 
  }

}])


angular.module("appControllers.postService", []).factory('postService', ['$http', function($http) {

  return {
    postComment: function (comment) { 
      $http({
        method : 'POST',
        url: '/api/conversations',
        data: comment
      })
      .success(function (data, status, headers, config) { 
        return data;
      })
      .error(function (data, status, headers, config) { 
        return status + headers;
      });
    },
    login: function() { 
      $http({
        method: 'POST',
        url: '/api/auth'
      })
      .success(function (data, status, headers, config) { 
        // do angular login stuff here
      })
      .error(function (data, status, headers, config) { 
   
      }); 
    },
    signup: function() { 
      $http({
        method: 'POST',
        url: '/api/users'
      })
      .success(function (data, status, headers, config) { 
        // do angular login stuff here
      })
      .error(function (data, status, headers, config) { 
   
      }); 
    }
  }

}])

appControllers.controller('viewCtrl', function ($scope) {
    $scope.$on("$routeChangeSuccess", function(event) {


    })
})

appControllers.controller('postArticleCtrl', function($scope, $http) { 
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
})

appControllers.controller('listArticlesCtrl', function($scope, $http) { 
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
})

appControllers.controller('getArticleCtrl', function ($scope, $http) {
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
})

appControllers.controller('signupCtrl', function($scope, $http) { 

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
})

appControllers.controller('loginCtrl', ['$scope', '$http', 'httpService', function($scope, $http, httpService) { 
  httpService.login();
}])

appControllers.controller('indexCtrl', ['$scope', '$http', 'httpService', function ($scope, $http, httpService)  {
  
    // toggle convos - use ng-show instead?
    $scope.convosOn = null;

    // initialize rangy highlighter here

    httpService.get();

    $scope.processForm = function() {    
      httpService.postComment();
    };
}]);

appControllers.controller('commentCtrl', function ($scope, $http) {
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
