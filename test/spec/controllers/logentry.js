'use strict';

describe('Controller: LogentryCtrl', function () {

  // load the controller's module
  beforeEach(module('myrunsApp'));

  var LogentryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LogentryCtrl = $controller('LogentryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    // expect(scope.awesomeThings.length).toBe(3);
  });
});
