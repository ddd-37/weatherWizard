import React, { Component } from "react";
import moment from "moment";
import DayCard from "./DayCard/DayCard";

class DailyForcast extends Component {
  render() {
    const days = this.props.data.map(day => {
      const dayText = moment(day.time * 1000).format("MMM D");
      return (
        <DayCard
          key={day.time}
          day={dayText}
          icon={day.icon}
          temperatureHigh={day.temperatureHigh}
          temperatureLow={day.temperatureLow}
        />
      );
    });
    console.log(this.props);
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2>Daily Forcast</h2>
        <div className="d-md-flex flex-md-row" style={{ minWidth: "20rem" }}>
          {days}
        </div>
      </div>
    );
  }
}

export default DailyForcast;
