const express = require('express');

const undianController = require('./undian-controller');

module.exports = (app) => {
  const route = express.Router();
  app.use('/undian', route);

  route.post('/', undianController.mulaiUndian);

  route.get('/jejak', undianController.jejakUndian);

  route.get('/hadiah', undianController.ambilHadiah);

  route.get('/pemenang', undianController.getlistPemenang);
};
