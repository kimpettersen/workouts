'use strict';

angular.module('myrunsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.workouts = [];

    $scope.populate = function() {
      var email = localStorage.getItem('email');

      $http.get(config.host + '/workout', {
        params: {
          email: email
        }
      }).success(function(data){
          $scope.workouts = data;
        });
    };

    $scope.remove = function(id) {
      $http.delete(config.host + '/workout/' + id)
        .success(function(){
          $scope.populate();
        })
    }
    $scope.populate();

  });
