import React, { Component } from "react";
import moment from "moment";
import DayCard from "./DayCard/DayCard";
import DayDetails from "./DayCard/DayDetails/DayDetails";
import PropTypes from "prop-types";

class DailyForcast extends Component {
  state = {
    daysData: this.props.data,
    dayDetailToDisplay: this.props.data[0],
    isDesktop: false
  };

  componentDidMount() {
    this.findVewPortSize();
    window.addEventListener("resize", this.findVewPortSize);
  }

  handleClickOnDay = e => {
    this.setState({
      dayDetailToDisplay: this.props.data[e.currentTarget.id]
    });
  };

  findVewPortSize = () => {
    const currentWindow = window.innerWidth > 768;

    if (currentWindow !== this.state.isDesktop) {
      this.setState({
        isDesktop: currentWindow
      });
    }
  };

  render() {
    const days = this.state.daysData.map((day, i) => {
      const dayText = moment(day.time * 1000).format("MMM D");
      return (
        <DayCard
          id={i}
          key={i}
          day={dayText}
          icon={day.icon}
          temperatureHigh={day.temperatureHigh}
          temperatureLow={day.temperatureLow}
          dataForDay={this.state.daysData[i]}
          isDesktop={this.state.isDesktop}
          clicked={this.handleClickOnDay}
          positionCoords={this.props.positionCoords}
        />
      );
    });
    return (
      <div className="container">
        <h2>Daily Forcast</h2>
        <div className="d-flex flex-column flex-md-row justify-content-around">
          {days}
        </div>
        {this.state.isDesktop && (
          <DayDetails
            data={this.state.dayDetailToDisplay}
            positionCoords={this.props.positionCoords}
            isDesktop={this.state.isDesktop}
          />
        )}
      </div>
    );
  }
}

DailyForcast.propTypes = {
  data: PropTypes.array.isRequired
};

export default DailyForcast;
