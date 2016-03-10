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
    this.baseUrl = 'http://localhost:8081/api/fotos';

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
        .respond(200, [{ caption: 'some foto' }]);

      $scope.fotos = [];
      $scope.loadAll();
      $httpBackend.flush();

      expect($scope.fotos.length).toBe(1);
      expect($scope.fotos[0].caption).toBe('some foto');
    });

    it('should be able to submit a new foto', () => {
      var reqData = { caption: 'request caption' };
      var resData = { caption: 'response caption' };

      $httpBackend.expectPOST(this.baseUrl, reqData)
        .respond(200, resData);

      $scope.fotos = [];
      $scope.newFoto = { caption: 'new foto caption' };
      $scope.postNew(reqData);
      $httpBackend.flush();

      expect($scope.fotos.length).toBe(1);
      expect($scope.fotos[0].caption).toBe('response caption');
      expect($scope.newFoto).toBe(null);
    });
  });
});
