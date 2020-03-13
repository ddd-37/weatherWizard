const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

const pino = require("express-pino-logger")();
const axios = require("axios");

app.use(bodyParser.json());
app.use(pino);

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

app.get("/celestialdata", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const data = await axios.get(
      `https://api.ipgeolocation.io/astronomy?apiKey=bb5f22a9e9f64c4d842cc1ca876ea2a8&lat=${lat}&long=${lng}`
    );

    let celestial = JSON.stringify(data, getCircularReplacer());
    res.setHeader("Content-Type", "application/json");
    res.send({
      celestialData: celestial
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/forecastdata", async (req, res) => {
  const { longitude, latitude } = req.query;

  try {
    // We need 8 days worth of data to display for celestial data.  Darksyk doesn't give us everything we need to we need to head to ipgeolocation to get the missing bits
    // ipgeolocation requires a YYY-MM-DD format to their dates so let's set that up as an array
    const dates = [];
    for (var i = 0; i <= 7; i++) {
      dates.push(
        moment()
          .add(i, "days")
          .format("YYYY-MM-DD")
      );
    }
    const [cityName, weatherData, ...celestialData] = await Promise.all([
      axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCSRfDuPVjVUmKFmIEFs4oLJwwngrVylrk`
      ),
      axios.get(
        `https://api.darksky.net/forecast/b2522f8b48049f38fd4bf5045e5c908f/${latitude},${longitude}`
      ),
      ...dates.map(date => {
        return axios.get(
          `https://api.ipgeolocation.io/astronomy?apiKey=bb5f22a9e9f64c4d842cc1ca876ea2a8&lat=${latitude}&long=${longitude}&date=${date}`
        );
      })
    ]);
    let city, state;
    const results = cityName.data.results;
    // The data returned from Google isn't formatted how we want it, we need to find just the types that match 'locality' {city} and 'administrative_area_level_1' {state} so we get something like Denver, CO
    // TODO - This seems to only work for certain locations - need a better solution
    for (let i = 0; i < results[0].address_components.length; i++) {
      for (let x = 0; x < results[0].address_components[i].types.length; x++) {
        const type = results[0].address_components[i].types[x];
        if (type === "locality") {
          // Locality holds the city name
          city = results[0].address_components[i].long_name;
          break;
        }
        if (type === "administrative_area_level_1") {
          // administrative_area_level_1 holds the state
          state = results[0].address_components[i].long_name;
          break;
        }
      }
    }

    let weather = JSON.stringify(weatherData, getCircularReplacer());
    // TODO - we've got a bunch of extra data, need to wittle it down a bit
    let celestial = JSON.stringify(celestialData, getCircularReplacer());

    res.setHeader("Content-Type", "application/json");
    res.send({
      location: city + ", " + state,
      forecastData: weather,
      sunMoonData: celestial
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Express server is running on ${port}`));
