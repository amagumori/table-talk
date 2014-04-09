'use strict';

/* Controllers */

var appControllers = angular.module('tableTalk.controllers', [])

appControllers.factory('getService', function($q) {
  return {
    getComments: function () { 
      var deferred = $q.defer();
      
      
    }
})

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

appControllers.controller('loginCtrl', function($scope, $http) { 

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
})

appControllers.controller('indexCtrl', [ 'getService', '$scope', '$http', '$q', '$window', '$document', function (getService, $scope, $http, $q, $window, $document )  {
  
    // toggle convos 
    $scope.convosOn = null;
    // holds serialized selection later
    $scope.selection = null
    // GET service handling all GET reqs
    $scope.getService = getService;
    $scope.getService.getItems();
 
    $scope.on('getService.update', function(ev, comments) { 
      $scope.comments = comments
    });

    // initialize rangy highlighter here

    var highlighter = rangy.createHighlighter($document, 'textContent');
    var cssApplier = rangy.createCssClassApplier('highlightclass', { normalize : true });

    // call this like: showHighlight(comment[$index])

    $scope.showHighlight = function(comment) { 
      var serializedSel = comment['selection'] 
      var range = rangy.deserializeSelection(serializedSel, undefined, $document);
      cssApplier.toggleRange(range);  //might have to call this twice?  so dum
    };

    // needs to execute before POST request obv

    $scope.highlightAndSerialize = function() {
      var sel = $window.getSelection();
      var serializedSel = rangy.serializeSelection(sel, true);
      if ($scope.newcomment) { 
        $scope.newcomment.forEach(function(e) { 
          e['selection'] = serializedSel;
        })            
      }
    };

    $scope.processForm = function() {    

      // requires selection to be active when form is posted!
      var sel = $window.getSelection().getRangeAt(0);
      var selection = {};

      selection['startContainer'] = sel['startContainer'];
      selection['endContainer'] = sel['endContainer'];
      selection['endOffset'] = sel['endOffset'];
      selection['startOffset'] = sel['startOffset'];
      console.dir(selection)


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
