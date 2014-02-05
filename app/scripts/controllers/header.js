'use strict';

angular.module('myrunsApp')
  .controller('HeaderCtrl', function ($scope, $location, $http) {

    $scope.user = localStorage.getItem('email');

    $scope.navigate = function(path) {
      if (path === '/logout') {
        $http.get(config.host + '/logout');
        return
      }
      $location.url(config.host + path);
    }
  });
