const angular = require('angular');
const fotoApp = angular.module('fotoApp', []);

require('./services/foto_service')(fotoApp);
require('./controllers/solo_controller')(fotoApp);
require('./directives/entry_form_directive')(fotoApp);
require('./directives/foto_view_directive')(fotoApp);
