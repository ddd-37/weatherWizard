import React, { Component } from "react";
import moment from "moment";
import DayCard from "./DayCard/DayCard";
import DayDetails from "./DayCard/DayDetails/DayDetails";
import PropTypes from "prop-types";

class DailyForcast extends Component {
  state = {
    displayData: this.props.weatherData[0],
    selectedDayId: 0,
    isDesktop: false
  };

  componentDidMount() {
    this.findVewPortSize();
    window.addEventListener("resize", this.findVewPortSize);
  }

  handleClickOnDay = e => {
    const selectedDayId = parseInt(e.currentTarget.id);
    console.log("DailyForcast -> selectedDayId", selectedDayId);
    this.setState({
      displayData: this.props.weatherData[selectedDayId],
      selectedDayId
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
    console.log(this.props.weatherData);
    const dayCards = this.props.weatherData.map((day, i) => {
      const dayText = moment(day.time * 1000).format("MMM D");
      const isSelected = i === this.state.selectedDayId;
      return (
        <DayCard
          id={i}
          key={i}
          day={dayText}
          icon={day.icon}
          temperatureHigh={day.temperatureHigh}
          temperatureLow={day.temperatureLow}
          dataForDay={this.props.weatherData[i]}
          isDesktop={this.state.isDesktop}
          isSelected={isSelected}
          clicked={this.handleClickOnDay}
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
