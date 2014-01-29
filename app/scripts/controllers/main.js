'use strict';

angular.module('myrunsApp')
  .controller('MainCtrl', function ($scope, $http, $cookies) {
    $scope.runs = [];



    // TODO: finish query by user



    $scope.populate = function() {
      var user = $cookies.user;

      $http.get('/run', {
        params: {
          user: user
        }
      })
        .success(function(data){
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
