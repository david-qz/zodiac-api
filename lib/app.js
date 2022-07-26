const express = require('express');
const path = require('path');

const app = express();

// App properties
app.set('view engine', 'pug');

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App routes
app.use('/zodiac', require('./controllers/zodiac.js'));
app.use('/horoscope', require('./controllers/horoscope'));
app.use('/pages', require('./controllers/pages'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
