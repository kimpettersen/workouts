'use strict';

angular.module('myrunsApp')
  .controller('MainCtrl', function ($scope, $http, $cookies) {
    $scope.runs = [];

    $scope.populate = function() {
      var email = $cookies.email;

      $http.get('http://lit-temple-4147.herokuapp.com/run', {
        params: {
          email: email
        }
      }).success(function(data){
        console.log(data);
          $scope.runs = data;
        });
    };

    $scope.remove = function(id) {
      $http.delete('http://lit-temple-4147.herokuapp.com/run/' + id)
        .success(function(){
          $scope.populate();
        })
    }
    $scope.populate();

  });
