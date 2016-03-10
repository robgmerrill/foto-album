const angular = require('angular');
const templateUrl = '/templates/entry_form_directive.html';
const template = require(__dirname + '/../../../app/templates/entry_form_directive.html');

describe('Entry form directive', () => {
  var $compile, $rootScope, $httpBackend;

  beforeEach(angular.mock.module('fotoApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should be able to load and render form', () => {
    $httpBackend.whenGET(templateUrl)
      .respond(200, template);

    var element = $compile('<entry-form data-new-foto="{}"></entry-form>')($rootScope);

    $httpBackend.flush();
    $rootScope.$digest();

    expect(element.html()).toContain('Submit a foto');
  });

  it('should able to call the formSubmit function', () => {
    var testScope = $rootScope.$new();
    $httpBackend.whenGET(templateUrl)
      .respond(200, template);

    var called = false;
    testScope.testSubmit = (formData) => {
      expect(formData.caption).toBe('called from scope');
      called = true;
    };
    var element = $compile('<entry-form data-new-foto="{}" data-form-submit=testSubmit></entry-form>')(testScope);

    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().formSubmit(testScope)({ caption: 'called from scope' });
    expect(called).toBe(true);
  });
});
