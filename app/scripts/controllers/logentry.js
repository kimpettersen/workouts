'use strict';

angular.module('myrunsApp')
  .controller('LogentryCtrl', function ($scope, $http) {
    $scope.units = ['km', 'miles'];
    $scope.today = moment().format('YYYY-MM-DD');

    $scope.submit = function(run) {
      if (run.date === undefined) {
        run.date = moment().format('YYYY-MM-DD');
        console.log(run.date);
      }

      $http.post('/run', run)
        .success(function(){
          console.log(arguments);
        });
    };

  });
