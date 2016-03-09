module.exports = function(app) {
  app.controller('SoloController', ['$scope', 'FotoService', function($scope, FotoService) {
    $scope.fotos = [];
    $scope.newFoto = null;

    $scope.getAll = function() {
      FotoService.get()
        .then(function(res) {
          $scope.fotos = res.data;
        }, function(err) {
          console.log('There was an error loading the fotos');
        });
    };

    $scope.postNew = function(postData) {
      FotoService.post(postData)
        .then(function(res) {
          $scope.fotos.push(res.data);
          $scope.newFoto = null;
        }, function(err) {
          console.log('There was an error posting your foto');
        });
    };
  }]);
};
