const request = require('postman-request');

const weather = ([atitude, longtitude], callback) => {
  const weather_url = 'http://api.weatherstack.com/current?access_key=91a921c954289fc79e4f0e5cf923f452&query=' + atitude + ',' + longtitude;

  request({ url: weather_url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service');
      //hanle errors
    } else if (body.error) {
      callback(body.error.info);
    } else {
      const data = {
        temperature: body.current.temperature,
        location: body.location.name,
        description: body.current.weather_descriptions,
        image: body.current.weather_icons[0],
      };
      callback(undefined, data);
    }
  });
};

module.exports = weather;
