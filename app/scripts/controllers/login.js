'use strict';

angular.module('myrunsApp')
  .controller('LoginCtrl', function ($scope, $http, $location) {
    $scope.login = function(user) {
      $http.post('http://lit-temple-4147.herokuapp.com/login', user).success(function(user) {
        localStorage.setItem('email', user.email);
        $location.path('/');
      });
    };
  });
