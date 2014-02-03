'use strict';

angular.module('myrunsApp')
  .controller('HeaderCtrl', function ($scope, $location, $http) {
    $scope.navigate = function(path) {
      if (path === '/logout') {
        $http.get(config.host + '/logout');
        return
      }
      $location.url(config.host + path);
    }
  });
