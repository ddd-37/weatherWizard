import React, { Component } from "react";
import moment from "moment";
import DayCard from "./DayCard/DayCard";
import DayDetails from "./DayCard/DayDetails/DayDetails";

class DailyForcast extends Component {
  state = {
    dayToDisplay: this.props.data[0].time,
    isDesktop: false
  };

  componentDidMount() {
    this.findVewPortSize();
    window.addEventListener("resize", this.findVewPortSize);
  }

  handleClickOnDay = e => {
    console.log(e.currentTarget);
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
    console.log("isDesktop", this.state.isDesktop);
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
          isDesktop={this.state.isDesktop}
        />
      );
    });
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2>Daily Forcast</h2>
        <div className="d-md-flex flex-md-row" style={{ minWidth: "20rem" }}>
          {days}
        </div>
        {this.state.isDesktop && <DayDetails />}
      </div>
    );
  }
}

export default DailyForcast;
