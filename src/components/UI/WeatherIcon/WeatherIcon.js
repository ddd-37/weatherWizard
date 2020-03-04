import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { PropTypes } from "prop-types";

const WeatherIcon = ({ icon, size, color }) => {
  icon = icon.replace(/-/g, "_").toUpperCase();
  return (
    <div>
      <ReactAnimatedWeather
        icon={icon}
        size={size || 50}
        color={color || "#fff"}
      />
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
