module.exports = exports = function(port) {

  const express = require('express');
  const app = express();
  const mongoose = require('mongoose');
// const fotosRouter = require(__dirname + '/routes/fotos_router');

mongoose.connect(process.env.MONGOLAT_URI || 'mongodb://localhost/fotos_app_dev');

  app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

  const fotosRouter = require(__dirname + '/../routes/fotos_router');
  app.use('/api', fotosRouter);

  app.use((req, res) => {
  res.status(404).json({ msg: 'Page not found' });
  });

  return app.listen(port, () => {
  console.log('Server is listening on port: ' + port);
});
};
