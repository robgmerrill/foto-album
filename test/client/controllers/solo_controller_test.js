const angular = require('angular');

describe('Solo controller', () => {
  var $httpBackend, $scope, $ControllerConstructor;

  beforeEach(angular.mock.module('fotoApp'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to construct a controller', () => {
    var soloController = $ControllerConstructor('SoloController', {$scope});
    expect(typeof soloController).toBe('object');
    expect($scope.fotos instanceof Array).toBe(true);
  });

  describe('HTTP requests', () => {
    this.baseUrl = 'http://localhost:3000/api/fotos';

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('SoloController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to load all fotos', () => {
      $httpBackend.expectGET(this.baseUrl)
        .respond(200, [{ summary: 'some foto' }]);

      $scope.fotos = [];
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.fotos.length).toBe(1);
      expect($scope.fotos[0].summary).toBe('some foto');
    });

    it('should be able to submit a new foto', () => {
      var reqData = { summary: 'request summary' };
      var resData = { summary: 'response summary' };

      $httpBackend.expectPOST(this.baseUrl, reqData)
        .respond(200, resData);

      $scope.fotos = [];
      $scope.newFoto = { summary: 'new foto summary' };
      $scope.postNew(reqData);
      $httpBackend.flush();

      expect($scope.fotos.length).toBe(1);
      expect($scope.fotos[0].summary).toBe('response summary');
      expect($scope.newFoto).toBe(null);
    });
  });
});
