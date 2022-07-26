const { Router } = require('express');

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
        horoscope: delegateJson.horoscope
      });
      return;
    }

    next(new Error('invalid sign'));
  });

module.exports = router;
