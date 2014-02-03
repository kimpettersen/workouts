'use strict';

angular.module('myrunsApp')
  .controller('LoginCtrl', function ($scope, $http, $location) {
    $scope.login = function(user) {
      $http.post(config.host + '/login', user).success(function(user) {
        localStorage.setItem('email', user.email);
        $location.path('/');
      });
    };
  });
