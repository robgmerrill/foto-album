const angular = require('angular');
const templateUrl = '/templates/foto_view_directive.html';
const template = require(__dirname + '/../../../app/templates/foto_view_directive.html');

describe('Foto view directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('fotoApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be able to load and render data', () => {
    $httpBackend.whenGET(templateUrl)
      .respond(200, template);

    var element = $compile('<foto-view data-foto-data="{summary:\'test summary\'}"></foto-view>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('test summar');
  });

  it('should able to load and render from scope', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET(templateUrl)
      .respond(200, template);

    testScope.testFoto = { summary: 'from scope' };
    var element = $compile('<foto-view data-foto-data=testFoto></foto-view>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('from scope');
  });
});
