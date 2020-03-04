import React from "react";
import PropTypes from "prop-types";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

const MainForecast = props => {
  console.log("props", props);
  const { location } = props;
  const {
    icon,
    summary,
    time,
    temperature,
    apparentTemperature,
    windSpeed,
    windBearing,
    pressure,
    visibility,
    dewPoint
  } = props.weatherData;

  return (
    <div>
      <div>
        <h2>{location}</h2>
        <div>
          <WeatherIcon
            icon={icon.replace(/-/g, "_").toUpperCase()}
            color={"#fff"}
          />
          <span>{Math.floor(temperature)}&#176;</span>
          <div>
            <span>F</span>
            <span>C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

MainForecast.propTypes = {
  location: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired
};

export default MainForecast;
