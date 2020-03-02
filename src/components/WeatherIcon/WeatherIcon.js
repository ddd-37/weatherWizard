import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { PropTypes } from "prop-types";

const WeatherIcon = ({ icon, color }) => {
  return (
    <div>
      <ReactAnimatedWeather icon={icon} color={color} />
    </div>
  );
};

ReactAnimatedWeather.propTypes = {
  icon: PropTypes.oneOf([
    "CLEAR_DAY",
    "CLEAR_NIGHT",
    "PARTLY_CLOUDY_DAY",
    "PARTLY_CLOUDY_NIGHT",
    "CLOUDY",
    "RAIN",
    "SLEET",
    "SNOW",
    "WIND",
    "FOG"
  ]).isRequired,
  animate: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string
};

export default WeatherIcon;
