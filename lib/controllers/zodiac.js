const { Router } = require('express');
const { ErrorWithStatus } = require('../utils/http-errors');
const zodiacSigns = require('../../data/zodiac-signs.json');

// Sorry about this, it's ugly...
const dateRanges = zodiacSigns.reduce((acc, value) => {
  const [start, end] = value.dates.split('-').map(x => {
    return parseDateYearNormalized(x);
  });
  acc[value.name] = { start, end };
  return acc;
}, {});

const router = new Router();

router
  .get('/all', (req, res) => {
    res.json(zodiacSigns);
  })
  .get('/search', (req, res, next) => {
    const dateString = req.query.date;

    if (!dateString) {
      next(new ErrorWithStatus('/zodiac/search requires a "date" query parameter', 400));
      return;
    }

    const date = parseDateYearNormalized(dateString);

    if (!date) {
      next(new ErrorWithStatus('unable to parse date', 400));
      return;
    }

    for (const [sign, range] of Object.entries(dateRanges)) {
      if (date >= range.start && date <= range.end) {
        res.json({
          sign
        });
        return;
      }
    }

    next(new ErrorWithStatus('something went wrong :/', 500));
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;

    const data = zodiacSigns.find(x => x.id === id);

    if (data) {
      res.json(data);
    } else {
      next(new ErrorWithStatus('invalid id', 400));
    }
  })
  .get('/', (req, res) => {
    const data = zodiacSigns.map(x => ({ id: x.id, name: x.name }));
    res.json(data);
  });

function parseDateYearNormalized(dateString, year = 1970) {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return null;

  date.setFullYear(year);
  return date;
}

module.exports = router;
