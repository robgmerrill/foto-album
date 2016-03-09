const express = require('express');
const jsonParser = require('body-parser').json();
const Foto = require(__dirname + '/../models/foto');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var fotoRouter = module.exports = exports = express.Router();

fotoRouter.get('/fotos', (req, res) => {
  Foto.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

fotoRouter.post('/fotos', jsonParser, (req, res) => {
  var newFoto = new Foto(req.body);
  newFoto.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

fotoRouter.put('/fotos/:id', jsonParser, (req, res) => {
  var fotoData = req.body;
  delete fotoData._id;
  Foto.update({ _id: req.params.id }, fotoData, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'success' });
  });
});

fotoRouter.delete('/fotos/:id', (req, res) => {
  Foto.remove({ _id: req.params.id }, (err) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({ msg: 'success' })
  });
});
