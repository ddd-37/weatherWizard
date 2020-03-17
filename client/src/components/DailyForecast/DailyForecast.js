import React, { Component } from "react";
import moment from "moment";
import DayCard from "./DayCard/DayCard";
import DayDetails from "./DayCard/DayDetails/DayDetails";
import PropTypes from "prop-types";

class DailyForcast extends Component {
  state = {
    weatherData: this.props.weatherData,
    displayData: this.props.weatherData[0],
    isDesktop: false
  };

  componentDidMount() {
    this.findVewPortSize();
    window.addEventListener("resize", this.findVewPortSize);
  }

  handleClickOnDay = e => {
    this.setState({
      displayData: this.props.weatherData[e.currentTarget.id]
    });
  };

  findVewPortSize = () => {
    const currentWindow = window.innerWidth > 800;

    if (currentWindow !== this.state.isDesktop) {
      this.setState({
        isDesktop: currentWindow
      });
    }
  };

  render() {
    const dayCards = this.state.weatherData.map((day, i) => {
      const dayText = moment(day.time * 1000).format("MMM D");
      return (
        <DayCard
          id={i}
          key={i}
          day={dayText}
          icon={day.icon}
          temperatureHigh={day.temperatureHigh}
          temperatureLow={day.temperatureLow}
          dataForDay={this.state.weatherData[i]}
          isDesktop={this.state.isDesktop}
          clicked={this.handleClickOnDay}
          positionCoords={this.props.positionCoords}
        />
      );
    });
    return (
      <div className="container-md">
        <h2>Daily Forcast</h2>
        <div className="d-flex flex-column flex-md-row justify-content-around">
          {dayCards}
        </div>
        {this.state.isDesktop && (
          <DayDetails
            data={this.state.displayData}
            positionCoords={this.props.positionCoords}
            isDesktop={this.state.isDesktop}
          />
        )}
      </div>
    );
  }
}

DailyForcast.propTypes = {
  weatherData: PropTypes.array.isRequired
};

export default DailyForcast;
