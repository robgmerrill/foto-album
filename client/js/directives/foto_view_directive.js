module.exports = function(app) {
  app.directive('fotoView', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: '/templates/foto_view_directive.html',
      scope: {
        fotoData: '='
      },
      controller: function($scope) {
        $scope.fotoData = $scope.fotoData;
      }
    };
  });
};
