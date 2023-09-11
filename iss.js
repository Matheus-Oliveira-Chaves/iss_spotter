// API request for user`s IP address

const request = require('request'); //import request

const fetchMyIP = function (callback) { //define fetchMyIP

  request('https://api.ipify.org?format=json', (error, response, body) => { // Send an HTTP GET request to the URL and provide a callback function
    if (error) return callback(error, null);

    if (response.statusCode !== 200) { // If the response status code is not 200, return an error
      callback(Error(`status Code ${response.statusCode}`), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};


//API request for coordinates via IP  

const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return callback(error || 'Invalid request', null);

    }


    const data = JSON.parse(body);

    if (!data.latitude || !data.longitude) {
      return callback('Latitude or longitude not found', null);
    }

    const coordinates = {
      'latitude': data.latitude,
      'longitude': data.longitude,
    };
    callback(null, coordinates);
  });
};

//API request flyover times



const fetchISSFlyOverTimes = function (coords, callback) {
  const { latitude, longitude } = coords;

  request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      callback(error || 'Invalid request', null);
      return;
    }

    const data = JSON.parse(body);
    const flyoverTimes = data.response;
    callback(null, flyoverTimes);
  });
};


//API request for next ISS times for my location

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((ipError, ip) => {
    if (ipError) {
      return callback(ipError, null);
    }

    fetchCoordsByIP(ip, (coordsError, coords) => {
      if (coordsError) {
        return callback(coordsError, null);
      }

      fetchISSFlyOverTimes(coords, (flyoverError, flyoverTimes) => {
        if (flyoverError) {
          return callback(flyoverError, null);
        }

        callback(null, flyoverTimes);
      });
    });
  });
};





module.exports = {
  nextISSTimesForMyLocation,
}; // Export 