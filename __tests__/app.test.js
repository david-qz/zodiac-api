const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const { zodiacSigns } = require('../data/zodiac-signs.js');

describe('backend-zodiac routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/zodiac returns a list of zodiac signs', async () => {
    const res = await request(app).get('/zodiac');
    const expected = zodiacSigns.map(sign => (
      { id: sign.id, name: sign.name })
    );
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
