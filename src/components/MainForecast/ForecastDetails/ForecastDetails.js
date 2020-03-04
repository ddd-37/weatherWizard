import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import WeatherIcon from "../../../utils/WeatherIcon/WeatherIcon";

const ForecastDetails = ({
  apparentTemperature,
  windSpeed,
  windBearing,
  pressure,
  visibility,
  dewPoint
}) => {
  return (
    <div>
      <h6>Feels like: {Math.floor(apparentTemperature)}&#176;</h6>
    </div>
  );
};

ForecastDetails.propTypes = {
  apparentTemperature: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  windBearing: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  visibility: PropTypes.number.isRequired,
  dewPoint: PropTypes.number.isRequired
};

export default ForecastDetails;
