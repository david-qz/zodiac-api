const request = require('supertest');
const app = require('../lib/app');

const zodiacSigns = require('../data/zodiac-signs.json');

describe('backend-zodiac routes', () => {
  it('/zodiac returns a list of zodiac signs', async () => {
    const res = await request(app).get('/zodiac');
    const expected = zodiacSigns.map(sign => (
      { id: sign.id, name: sign.name })
    );
    expect(res.body).toEqual(expected);
  });

  it('/zodiac/:id returns detail about sign', async () => {
    const res = await request(app).get('/zodiac/1');
    const expected = {
      id: '1',
      name: 'aquarius',
      dates: 'Jan 21 - Feb 19',
      symbol: 'Water Bearer'
    };
    expect(res.body).toEqual(expected);
  });

  it('/zodiac/all returns the full sign list', async () => {
    const res = await request(app).get('/zodiac/all');
    expect(res.body).toEqual(zodiacSigns);
  });
});
