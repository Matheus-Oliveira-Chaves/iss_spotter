// const { fetchMyIP } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });


// const { fetchCoordsByIP } = require('./iss');
// fetchCoordsByIP('177.12.16.224', (error, data ) => {
  //   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('latitude and longitude: ', data.latitude, data.longitude);
// });


// const { fetchISSFlyOverTimes } = require('./iss');
/// const coordinates = {
//   latitude: data.latitude,
//   longitude: data.longitude,
// };
// fetchISSFlyOverTimes(coordinates, (error, flyoverTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('Upcoming ISS Flyover Times:');
//   flyoverTimes.forEach((time) => {
//     const date = new Date(time.risetime * 1000); // Convert Unix timestamp to date
//     console.log(`Rise Time: ${date.toLocaleString()}, Duration: ${time.duration} seconds`);
//   });
// });

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
        const datetime = new Date(0);
        datetime.setUTCSeconds(pass.risetime);
        const duration = pass.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
      }
    };

    
    nextISSTimesForMyLocation((error, passTimes) => {
      if (error) {
        return console.log("It didn't work!", error);
      }
      // success, print out the deets!
  printPassTimes(passTimes);
});
