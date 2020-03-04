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
    const [cityName, weatherData] = await Promise.all([
      axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCSRfDuPVjVUmKFmIEFs4oLJwwngrVylrk`
      ),

      // TODO - this cors-anywhere.herokuapp.com seems hacky, need to find a more proper solution
      axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b2522f8b48049f38fd4bf5045e5c908f/${latitude},${longitude}`
      )
    ]);
    let city, state;
    const results = cityName.data.results;

    // The data returned from Google isn't formatted how we want it, we need to find just the types that match 'locality' {city} and 'administrative_area_level_1' {state} so we get something like Denver, CO
    // TODO - This seems to only work for certain locations - need a better solution

    for (let i = 0; i < results[0].address_components.length; i++) {
      // prettier-ignore
      for (let x = 0; x < results[0].address_components[i].types.length; x++) {
          const type = results[0].address_components[i].types[x];
          if (type === 'locality') { // Locality holds the city name
              city = results[0].address_components[i].long_name;
              break;
          }

          if (type === 'administrative_area_level_1') { // administrative_area_level_1 holds the state
              state = results[0].address_components[i].long_name;
              break;
          }
      }
    }

    this.setState({
      loading: false,
      locationText: city + ", " + state,
      weatherData: weatherData.data
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
      return (
        <div className="App container-md p-2">
          <MainForecast
            location={this.state.locationText}
            weatherData={this.state.weatherData.currently}
          />
          <DailyForcast data={this.state.weatherData.daily.data} />
        </div>
      );
    }
  }
}

export default App;
