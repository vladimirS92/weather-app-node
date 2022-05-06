const request = require('postman-request');

const geocode = (address, callback) => {
  const geocoding_url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoic3ZldG91Y2gwNTAzIiwiYSI6ImNsMnFiZ25zdzA0bjEzbm5zYmZleGZ6emwifQ.sOmqzcp1AdxjTBD984XtRg&limit=1';

  request({ url: geocoding_url, json: true }, (error, { body }) => {
    if (error) {
      callback(error);
      //error handling
    } else if (body.message) {
      callback(body.message);
    } else if (body.features.length === 0) {
      callback('Please make a valid location request');
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        geolocation: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
