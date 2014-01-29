'use strict';

angular.module('myrunsApp')
  .controller('MainCtrl', function ($scope, $http, $cookies) {
    $scope.runs = [];

    $scope.populate = function() {
      var email = $cookies.email;

      $http.get('/run', {
        params: {
          email: email
        }
      }).success(function(data){
        console.log(data);
          $scope.runs = data;
        });
    };

    $scope.remove = function(id) {
      $http.delete('/run/' + id)
        .success(function(){
          $scope.populate();
        })
    }
    $scope.populate();

  });
