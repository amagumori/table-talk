'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('tableTalk.services', []).
  value('version', '0.1').
  factory('getService', function($http) { 
    function getItems () { 
      $http.get('/api/comments').success(function (data) {
        console.log('GET DATA: ' + data);
        var results = data.results;
      })
    }
  });
