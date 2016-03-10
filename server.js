const clientPort = 5000;
const backendPort = 3000;

const clientServer = require(__dirname + '/lib/client_server');
clientServer(clientPort);

const backendServer = require(__dirname + '/lib/server');
backendServer(backendPort);
