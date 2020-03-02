import React from "react";

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
          <span>Icon</span>
          <span>{temperature}</span>
          <div>
            <span>F</span>
            <span>C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainForecast;
