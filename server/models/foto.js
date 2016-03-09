const mongoose = require('mongoose');

var fotoSchema = new mongoose.Schema({
  name: { type: String, default: 'Foto' },
  url: String,
  summary: String,
});

var Foto = module.exports = exports = mongoose.model('Foto', fotoSchema);
