import React from "react";
import WeatherIcon from "../../../utils/WeatherIcon/WeatherIcon";

const IconTempToggle = ({ location, icon, temperature, summary }) => {
  return (
    <>
      <h2>{location}</h2>
      <div
        className="d-flex justify-content-center"
        style={{ width: "15rem", margin: "auto" }}
      >
        <WeatherIcon
          icon={icon.replace(/-/g, "_").toUpperCase()}
          color={"#fff"}
          size={50}
        />
        <div className="flex-fill flex-grow-2">
          <h1>{Math.floor(temperature)}&#176;</h1>
        </div>
        <div className="d-flex flex-column">
          <h5>F</h5>
          <h5>C</h5>
        </div>
      </div>
      <h5>{summary}</h5>
    </>
  );
};
export default IconTempToggle;
