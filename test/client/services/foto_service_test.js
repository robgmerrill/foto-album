const angular = require('angular');

describe('Foto service', () => {
  var $httpBackend, FotoService;

  beforeEach(angular.mock.module('fotoApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _FotoService_) {
    $httpBackend = _$httpBackend_;
    FotoService = _FotoService_;
  }));

  it('should be a singleton service', () => {
    expect(typeof FotoService).toBe('object');
    expect(FotoService.baseUrl).toBe('http://localhost:3000/api/fotos');
  });

  describe('methods with HTTP requests', () => {
    this.baseUrl = 'http://localhost:3000/api/fotos';

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to handle an error', () => {
      $httpBackend.expectGET(this.baseUrl)
        .respond(400);

      var called = false;
      FotoService.get().catch((err) => {
        expect(typeof err).toBe('object');
        called = true;
      });
      $httpBackend.flush();

      expect(called).toBe(true);
    });

    it('should be able to make a GET request', () => {
      $httpBackend.expectGET(this.baseUrl)
        .respond(200, [{ caption: 'some caption' }]);

      var called = false;
      FotoService.get().then((res) => {
        expect(res.data.length).toBe(1);
        expect(res.data[0].caption).toBe('some caption');
        called = true;
      });
      $httpBackend.flush();

      expect(called).toBe(true);
    });

    it('should be able to make a POST request', () => {
      var reqData = { caption: 'request caption' };
      var resData = { caption: 'response caption' };

      $httpBackend.expectPOST(this.baseUrl, reqData)
        .respond(200, resData);

      var called = false;
      FotoService.post(reqData).then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.caption).toBe('response caption');
        called = true;
      });
      $httpBackend.flush();

      expect(called).toBe(true);
    });
  });
});
