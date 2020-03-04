import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import WeatherIcon from "../../../utils/WeatherIcon/WeatherIcon";
import WindSpeedDiretion from "./../../UI/WindSpeedDirection/WindSpeedDirection";

const ForecastDetails = ({
  apparentTemperature,
  windSpeed,
  windBearing,
  pressure,
  humidity,
  visibility,
  dewPoint
}) => {
  return (
    <div>
      <div>
        <h6>Feels like {Math.floor(apparentTemperature)}&#176;</h6>
        <h6>
          Wind <WindSpeedDiretion speed={windSpeed} bearing={windBearing} />
        </h6>
        <h6>Visibility {visibility} mi</h6>
      </div>
      <div>
        <h6>Barometer {(pressure * 0.02953).toFixed(2)} in</h6>
        <h6>Humidity {humidity * 100}%</h6>
      </div>
    </div>
  );
};

ForecastDetails.propTypes = {
  apparentTemperature: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
  windBearing: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  visibility: PropTypes.number.isRequired,
  dewPoint: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired
};

export default ForecastDetails;
