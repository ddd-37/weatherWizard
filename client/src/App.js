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
    console.log("App -> componentDidMount -> componentDidMount");
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
    console.log("App -> longitude", longitude);
    const res = await axios.get(
      `/forecastdata?latitude=${latitude}&longitude=${longitude}`
    );

    const locationText = res.data.location;
    const weatherData = JSON.parse(res.data.forecastData).data;

    this.setState({
      loading: false,
      locationText,
      weatherData,
      positionCoords: {
        lat: latitude.toFixed(2),
        lng: longitude.toFixed(2)
      }
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
            data={this.state.weatherData.daily.data}
            positionCoords={this.state.positionCoords}
          />
        </div>
      );
    }
  }
}

export default App;
