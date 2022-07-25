const { Router } = require('express');
const { zodiacSigns } = require('../../data/zodiac-signs');

const router = new Router();

router
  .get('/all', (req, res) => {
    res.json(zodiacSigns);
  })
  .get('/:id', (req, res) => {
    const id = req.params.id;
    const data = zodiacSigns.find(x => x.id === id);
    res.json(data);
  })
  .get('/', (req, res) => {
    const data = zodiacSigns.map(x => ({ id: x.id, name: x.name }));
    res.json(data);
  });

module.exports = router;
