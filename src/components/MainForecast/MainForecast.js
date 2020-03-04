import React from "react";
import PropTypes from "prop-types";

import IconTempToggle from "./IconTempToggle/IconTempToggle";

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
    <div className="text-center">
      <IconTempToggle
        location={location}
        icon={icon}
        temperature={temperature}
        summary={summary}
        time={time}
      />
    </div>
  );
};

MainForecast.propTypes = {
  location: PropTypes.string.isRequired,
  weatherData: PropTypes.object.isRequired
};

export default MainForecast;
