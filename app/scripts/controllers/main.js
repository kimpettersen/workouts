'use strict';

angular.module('myrunsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.runs = [];

    $scope.populate = function() {
      var email = localStorage.getItem('email');

      $http.get(config.host + '/run', {
        params: {
          email: email
        }
      }).success(function(data){
          $scope.runs = data;
        });
    };

    $scope.remove = function(id) {
      $http.delete(config.host + '/run/' + id)
        .success(function(){
          $scope.populate();
        })
    }
    $scope.populate();

  });
