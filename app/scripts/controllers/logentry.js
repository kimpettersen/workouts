'use strict';

angular.module('myrunsApp')
  .controller('LogentryCtrl', function ($scope, $http, $cookies) {
    $scope.units = ['km', 'miles'];
    $scope.today = moment().format('YYYY-MM-DD');

    $scope.submit = function(run) {
      if (run.date === undefined) {
        run.date = moment().format('YYYY-MM-DD');
      }
      var email = $cookies.email;

      run.email = email;

      $http.post('http://lit-temple-4147.herokuapp.com/run', run)
        .success(function(){
          console.log(arguments);
        });
    };

  });
