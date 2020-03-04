import React from "react";
import PropTypes from "prop-types";

import IconTempToggle from "./IconTempToggle/IconTempToggle";
import ForecastDetails from "./ForecastDetails/ForecastDetails";

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
    humidity,
    visibility,
    dewPoint
  } = props.weatherData;
  const iconTempToggle = { icon, summary, time, temperature };

  return (
    <div className="text-center">
      <IconTempToggle
        location={location}
        icon={icon}
        temperature={temperature}
        summary={summary}
        time={time}
      />
      <ForecastDetails
        apparentTemperature={apparentTemperature}
        windSpeed={windSpeed}
        windBearing={windBearing}
        pressure={pressure}
        visibility={visibility}
        dewPoint={dewPoint}
        humidity={humidity}
      />
    </div>
  );
};

MainForecast.propTypes = {
  location: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired
};

export default MainForecast;
