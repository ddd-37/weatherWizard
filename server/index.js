const express = require("express");
const app = express();
const path = require("path");
const buildPath = path.join(__dirname, "build");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(express.static(buildPath));

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

app.get("/forecastdata", async (req, res) => {
  const { longitude, latitude } = req.query;
  try {
    const [cityName, weatherData] = await Promise.all([
      axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCSRfDuPVjVUmKFmIEFs4oLJwwngrVylrk`
      ),

      // TODO - this cors-anywhere.herokuapp.com seems hacky, need to find a more proper solution
      axios.get(
        `https://api.darksky.net/forecast/b2522f8b48049f38fd4bf5045e5c908f/${latitude},${longitude}`
      )
    ]);
    console.log("cityName", cityName.data);

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
    console.log(typeof weatherData);
    let data = JSON.stringify(weatherData, getCircularReplacer());
    res.setHeader("Content-Type", "application/json");
    res.send({ location: city + ", " + state, forecastData: data });
  } catch (err) {
    console.log(err);
  }
});

// Serve up the index page no matter what
app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(port, () =>
  console.log("Express server is running on localhost:5000")
);
