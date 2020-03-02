import React, { Component } from "react";
import axios from "axios";

import "./App.css";

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
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=AIzaSyCSRfDuPVjVUmKFmIEFs4oLJwwngrVylrk`
      ),

      axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b2522f8b48049f38fd4bf5045e5c908f/${latitude},${longitude}`
      )
    ]);

    this.setState({
      loading: false,
      locationText: cityName.data.results[0].formatted_address,
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
      return <div className="App">Loading</div>;
    }

    if (this.state.error) {
      return <div className="App">{this.state.error}</div>;
    }

    if (this.state.weatherData) {
      return <div className="App">App Data</div>;
    }
  }
}

export default App;
