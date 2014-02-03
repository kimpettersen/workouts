'use strict';

angular.module('myrunsApp', [
  'ngResource',
  'ngRoute',
  'angular-lodash'
])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/logentry', {
        templateUrl: 'views/logentry.html',
        controller: 'LogentryCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .otherwise({
        redirectTo: '/',
        resolve: {
          loggedin: checkLoggedin
        }
      });

    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          function(response){
            return response;
          },
          function(response) {
            if (response.status === 401)
              $location.url('/login');
              return $q.reject(response);
          }
        );
      }
    });

    function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();

      $http.get('/loggedin').success(function(user){
        if (user !== '0'){
          $timeout(deferred.resolve, 0);
        } else {
          $rootScope.message = 'You need to log in.';
          $timeout(function(){
            deferred.reject();
          }, 0);
        $location.url('/login');
      }
    });
  }
});


















