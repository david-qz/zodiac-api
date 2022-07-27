const { Router } = require('express');
const { ErrorWithStatus } = require('../utils/http-errors');

const router = new Router();

const zodiacData = require('../../data/zodiac-signs.json');
const zodiacSigns = zodiacData.map(x => x.name);

const delegateUrlBase = 'https://ohmanda.com/api/horoscope';

router
  .get('/:sign', async (req, res, next) => {
    const sign = req.params.sign;

    if (zodiacSigns.includes(sign)) {
      const delegateUrl = `${delegateUrlBase}/${sign}`;
      const delegateResponse = await fetch(delegateUrl);
      const delegateJson = await delegateResponse.json();

      res.json({
        date: delegateJson.date,
        horoscope: delegateJson.horoscope
      });
      return;
    }

    next(new ErrorWithStatus('invalid sign', 400));
  });

module.exports = router;
