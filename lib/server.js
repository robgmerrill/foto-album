const express = require('express');
const app =module.exports = exports = express();
const mongoose = require('mongoose');
const fotosRouter = require(__dirname + '/routes/fotos_router');

mongoose.connect(process.env.MONGOLAT_URI || 'mongodb://localhost/fotos_app_dev');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', fotosRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server is up on port: ' + PORT));
