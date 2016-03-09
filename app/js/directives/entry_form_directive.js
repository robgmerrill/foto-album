module.exports = function(app) {
  app.directive('entryForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/entry_form_directive.html',
      scope: {
        formSubmit: '&',
        newFoto: '='
      },
      controller: function($scope) {
        $scope.newFoto = $scope.newFoto;
      }
    };
  });
};
