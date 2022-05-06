const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/weather');

const app = express();
//setup port for heroku
const port = process.env.PORT || 3000;

//define static directory path
app.use(express.static(path.join(__dirname, '../public')));
//define path
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//set up
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'svetouch',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About app',
    name: 'svetouch',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Help message.',
    name: 'svetouch',
  });
});

app.get('/help/*', (req, res) => {
  res.send('Help article not found.');
});

//get weather by ?address=
app.get('/weather', (req, res) => {
  geocode(req.query.address, (error, { latitude, longtitude, geolocation } = {}) => {
    if (error) {
      return res.send(error ? error : 'No address provided');
    }
    forecast([latitude, longtitude], (error, { temperature, location, description }) => {
      if (error) {
        res.send(error);
      }

      res.send({
        forcast: 'It is currently ' + temperature + ' degrees out in ' + location + '. ' + description + '.',
        location: geolocation,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    message: 'page not found',
  });
});

//define localhost port test
// app.listen(3000, () => console.log('Server is up on port 3000'));

//prd
app.listen(port, () => console.log('Server is up on port ' + port));
