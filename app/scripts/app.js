'use strict';

angular.module('myrunsApp', [
  'ngResource',
  'ngRoute',
  'angular-lodash'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/logentry', {
        templateUrl: 'views/logEntry.html',
        controller: 'LogentryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
