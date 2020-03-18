import React, { Component } from "react";
import WeatherIcon from "../../UI/WeatherIcon/WeatherIcon";
import Temperature from "../../UI/Temperature/Temperature";
import DayDetails from "./../DayCard/DayDetails/DayDetails";
import PropTypes from "prop-types";

class DayCard extends Component {
  state = {
    isVisible: false
  };

  // Will only fire when not on a desktop, used to expand the row to show the day card's data
  handleClick = e => {
    const toggle = !this.state.isVisible;
    this.setState({ isVisible: toggle });
  };

  render() {
    const {
      id,
      day,
      icon,
      temperatureHigh,
      temperatureLow,
      clicked,
      isDesktop,
      isSelected,
      dataForDay
    } = this.props;

    const active = isSelected ? "bg-light text-dark " : "";
    const classes = isDesktop ? `border ${active}` : "border-bottom";
    return (
      <div
        style={{ cursor: "pointer" }}
        className={`${classes} border-light m-1 p-2`}
        id={id}
        onClick={isDesktop ? clicked : this.handleClick}
      >
        <div
          className="d-flex flex-row flex-md-column justify-content-between"
          style={{ minWidth: "5rem" }}
        >
          <h6 className="flex-fill">{day}</h6>
          <WeatherIcon icon={icon} size={30} color={isSelected && "#343a40"} />
          <span className="mx-4 mx-md-0">
            <Temperature temp={temperatureHigh} size={"1.5rem"} />{" "}
            <Temperature temp={temperatureLow} size={"1rem"} />
          </span>
          {isDesktop || <span>{this.state.isVisible ? "-" : "+"}</span>}
        </div>
        {!isDesktop && this.state.isVisible && (
          <DayDetails
            data={dataForDay}
            isDesktop={isDesktop}
            isVisible={this.state.isVisible}
          />
        )}
      </div>
    );
  }
}

DayCard.propTypes = {
  id: PropTypes.number.isRequired,
  day: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  temperatureHigh: PropTypes.number.isRequired,
  temperatureLow: PropTypes.number.isRequired,
  clicked: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  dataForDay: PropTypes.object.isRequired
};

export default DayCard;
