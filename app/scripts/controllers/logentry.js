'use strict';

angular.module('myrunsApp')
  .controller('LogentryCtrl', function ($scope, $http) {
    $scope.units = ['km', 'miles'];
    $scope.today = moment().format('YYYY-MM-DD');

    $scope.submit = function(run) {
      var email = localStorage.getItem('email');

      if (typeof run.date === 'undefined') {
        run.date = moment().format('YYYY-MM-DD');
      }

      if (typeof email === 'undefined') {
        alert('No email is set!')
        return;
      }

      run.email = email;
      run.hours = run.hours || '0'
      run.minutes = run.minutes || '0'
      run.seconds = run.seconds || '0'

      $http.post(config.host + '/run', run)
        .success(function(){
        });
    };

  });
