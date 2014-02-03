'use strict';

angular.module('myrunsApp')
  .controller('LogentryCtrl', function ($scope, $http) {
    $scope.units = ['km', 'miles'];
    $scope.type = ['Run', 'Walk', 'Cycle', 'Swim'];
    $scope.today = moment().format('YYYY-MM-DD');

    $scope.submit = function(workout) {
      var email = localStorage.getItem('email');

      if (typeof workout.date === 'undefined') {
        workout.date = moment().format('YYYY-MM-DD');
      }

      if (typeof email === 'undefined') {
        alert('No email is set!')
        return;
      }

      workout.email = email;
      workout.hours = workout.hours || '0'
      workout.minutes = workout.minutes || '0'
      workout.seconds = workout.seconds || '0'

      $http.post(config.host + '/workout', workout)
        .success(function(){
        });
    };

  });
