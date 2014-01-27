'use strict';

angular.module('myrunsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.runs = [];



    $scope.populate = function() {
      $http.get('/run')
        .success(function(data){
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
