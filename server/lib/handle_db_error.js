module.exports = exports = function(err, res) {
  return res.status(500).json({ msg: 'experiencing server error' });
};
