import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import WeatherIcon from "../../../utils/WeatherIcon/WeatherIcon";
import WindSpeedDiretion from "./../../UI/WindSpeedDirection/WindSpeedDirection";
import Temperature from "../../UI/Temperature/Temperature";

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
    <div className="d-flex">
      <div>
        <h6>
          Feels like <Temperature temp={apparentTemperature} />
        </h6>
        <h6>
          Wind <WindSpeedDiretion speed={windSpeed} bearing={windBearing} />
        </h6>
        <h6>Visibility {visibility} mi</h6>
      </div>
      <div>
        <h6>Barometer {(pressure * 0.02953).toFixed(2)} in</h6>
        <h6>Humidity {Math.floor(humidity * 100)}%</h6>
        <h6>
          Dewpoint <Temperature temp={dewPoint} />
        </h6>
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
