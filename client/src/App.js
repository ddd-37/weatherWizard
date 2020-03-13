import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import MainForecast from "./components/MainForecast/MainForecast";
import DailyForcast from "./components/DailyForecast/DailyForecast";

class App extends Component {
  state = {
    loading: true,
    locationText: null,
    weatherData: null,
    positionCoords: null,
    error: null // TODO - Set up error handling
  };

  componentDidMount() {
    // Get the lat and long
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

  locationSuccess = async position => {
    const { longitude, latitude } = position.coords;
    const res = await axios.get(
      `/forecastdata?latitude=${latitude}&longitude=${longitude}`
    );

    const locationText = res.data.location;
    let weatherData = JSON.parse(res.data.forecastData).data;

    const celestialData = JSON.parse(res.data.sunMoonData).map(item => {
      return item.data;
    });

    // The sun and moon rise times come from our celestialData, need to append that to our weatherData obj here
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
      weatherData,
      celestialData
    });
  };

  locationError = error => {
    console.log(error);
    this.setState({
      error: "Unable to retrieve your lcoation, please try again"
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="App">
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
      console.log(this.state);
      return (
        <div className="App container-md p-2">
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
