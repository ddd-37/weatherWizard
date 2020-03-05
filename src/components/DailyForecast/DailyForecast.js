import React, { Component } from "react";
import moment from "moment";
import DayCard from "./DayCard/DayCard";

class DailyForcast extends Component {
  state = {
    dayToDisplay: this.props.data[0].time
  };

  handleClickOnDay = e => {
    console.log(e.target);
  };

  render() {
    const days = this.props.data.map((day, i) => {
      const dayText = moment(day.time * 1000).format("MMM D");
      let selected = false;
      if (this.state.dayToDisplay === day.time) {
        selected = true;
      }
      return (
        <DayCard
          key={i}
          day={dayText}
          icon={day.icon}
          temperatureHigh={day.temperatureHigh}
          temperatureLow={day.temperatureLow}
          clicked={this.handleClickOnDay}
          selected={selected}
        />
      );
    });
    console.log(this.state);
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
