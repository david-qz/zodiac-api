const { Router } = require('express');

const zodiacSigns = require('../../data/zodiac-signs.json');
const { ErrorWithStatus } = require('../utils/http-errors');

const router = new Router();

router
  .get('/zodiac/:id', (req, res, next) => {
    const id = req.params.id;
    const sign = zodiacSigns.find(x => x.id === id);

    if(!sign) {
      next(new ErrorWithStatus('bad sign id', 400));
      return;
    }

    res.render('sign-detail', { sign });
  })
  .get('/zodiac', (req, res) => {
    res.render('sign-list', { signs: zodiacSigns });
  });

module.exports = router;
