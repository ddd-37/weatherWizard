import React, { Component } from "react";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    loading: true,
    data: null,
    error: null
  };

  componentDidMount() {}

  render() {
    if (this.state.loading) {
      return <div className="App">Loading</div>;
    }

    if (this.state.data) {
      return <div className="App">App Data</div>;
    }
  }
}

export default App;
