import React, { Component } from "react";
import axios from "axios";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import "./App.css";
import MainForecast from "./components/MainForecast/MainForecast";
import DailyForcast from "./components/DailyForecast/DailyForecast";
import SearchBar from "./components/UI/SearchBar/SearchBar";

class App extends Component {
  state = {
    loading: true,
    locationText: null,
    weatherData: null,
    positionCoords: null,
    error: null // TODO - Set up error handling
  };

  componentDidMount() {
    console.log("App -> componentDidMount -> componentDidMount");
    //Get the lat and long
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.locationSuccess,
        this.locationError
      );
    } else {
      alert(
        "Geolocation is not enabled on your device. Please enable and try again."
      );
    }
  }

  handleSelectOnSearchBar = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log("Success", latLng);
        const { lat, lng } = latLng;
        const position = {
          coords: {
            latitude: lat,
            longitude: lng
          }
        };
        this.setState({
          loading: true
        });
        this.locationSuccess(position);
      })
      .catch(error => console.error("Error", error));
  };

  locationSuccess = async position => {
    console.log("App -> position", position);
    const { longitude, latitude } = position.coords;

    // Get all forcast data
    const forecastData = await axios.get(
      `/forecastdata?latitude=${latitude}&longitude=${longitude}`
    );
    console.log("App -> forecastData", forecastData);

    const locationText = forecastData.data.location;

    // The API limit for the celestial data is a bit low, so let's cache this info in localstorage, and only update it once every 24 hours
    const currentTime = new Date().getTime();
    const lastUpdate = localStorage.getItem("lastCelestialUpdate");

    if (currentTime - lastUpdate > 1000 * 60 * 60 * 24) {
      localStorage.setItem("lastCelestialUpdate", currentTime);
      const celestialResponse = await axios.get(
        `/celestialdata?latitude=${latitude}&longitude=${longitude}`
      );

      const celestialObj = JSON.parse(celestialResponse.data.data).map(date => {
        return date.data;
      });

      localStorage.setItem("celestialdata", JSON.stringify(celestialObj));
    }

    const celestialData = JSON.parse(localStorage.getItem("celestialdata"));

    // The sun and moon rise times come from our celestialData, need to append that to our weatherData obj here
    let weatherData = JSON.parse(forecastData.data.forecastData).data;
    console.log("App -> weatherData", weatherData);
    weatherData.daily.data.forEach((item, i) => {
      item.sunrise = celestialData[i].sunrise;
      item.sunset = celestialData[i].sunset;
      item.day_length = celestialData[i].day_length;
      item.moonrise = celestialData[i].moonrise;
      item.moonset = celestialData[i].moonset;
    });

    this.setState({
      loading: false,
      locationText,
      weatherData
      //celestialData
    });
  };

  locationError = error => {
    console.log(error);
    this.setState({
      error: "Unable to retrieve your lcoation, please try again"
    });
  };

  render() {
    console.log("App -> render -> render");
    if (this.state.loading) {
      return (
        <div className="App d-flex justify-content-center align-items-center">
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (this.state.error) {
      return <div className="App">{this.state.error}</div>;
    }

    if (this.state.weatherData) {
      console.log(
        "App -> render -> this.state.weatherData",
        this.state.weatherData
      );
      return (
        <div className="App ">
          <header className="d-flex justify-content-between px-4 mb-4">
            <h1 className="font-weight-light flex-grow-2">
              Weather&nbsp;Wizard
            </h1>
            <SearchBar onSelect={this.handleSelectOnSearchBar} />
          </header>

          <MainForecast
            location={this.state.locationText}
            weatherData={this.state.weatherData.currently}
          />
          <DailyForcast
            weatherData={this.state.weatherData.daily.data}
            positionCoords={this.state.positionCoords}
            celestialData={this.state.celestialData}
          />
        </div>
      );
    }
  }
}

export default App;
