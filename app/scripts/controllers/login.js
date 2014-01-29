'use strict';

angular.module('myrunsApp')
  .controller('LoginCtrl', function ($scope, $http, $location, $cookies) {
    $scope.login = function(user) {
      $http.post('/login', user).success(function(user) {
        $cookies.email = user.email;
        $location.path('/');
      });
    };
  });