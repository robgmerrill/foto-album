module.exports = function(app) {
  app.factory('FotoService', ['$http', function($http) {
    return {
      baseUrl: 'http://localhost:3000/api/fotos',
      get: function() {
        return $http.get(this.baseUrl);
      },
      post: function(postData) {
        return $http.post(this.baseUrl, postData);
      }
    };
  }]);
};
