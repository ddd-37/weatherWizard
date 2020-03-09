import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import WeatherIcon from "../../UI/WeatherIcon/WeatherIcon";
import Temperature from "./../../UI/Temperature/Temperature";

const IconTempToggle = ({ location, icon, temperature, summary, time }) => {
  return (
    <div className="mb-4 text-center">
      <h2>{location}</h2>
      <div className="d-flex" style={{ width: "15rem", margin: "auto" }}>
        <WeatherIcon icon={icon} color={"#fff"} size={60} />
        <div className="flex-fill flex-grow-2">
          <h1>
            <Temperature temp={temperature} />
          </h1>
        </div>
        <div className="d-flex flex-column">
          <h5>F</h5>
          <h5>C</h5>
        </div>
      </div>
      <h5>{summary}</h5>
      <h6>Updated at {moment(time * 1000).format("h:mm a")}</h6>
    </div>
  );
};

IconTempToggle.propTypes = {
  location: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};

export default IconTempToggle;
