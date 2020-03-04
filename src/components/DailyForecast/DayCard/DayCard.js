import React from "react";
import WeatherIcon from "../../UI/WeatherIcon/WeatherIcon";
import Temperature from "../../UI/Temperature/Temperature";

const DayCard = ({ day, icon, temperatureHigh, temperatureLow }) => {
  return (
    <div
      className="d-flex flex-row flex-md-column justify-content-around border border-light m-1 p-1"
      style={{ minWidth: "5rem" }}
    >
      <h6>{day}</h6>
      <div>
        <WeatherIcon icon={icon} size={30} />
      </div>
      <span>
        <Temperature temp={temperatureHigh} size={"1.5rem"} />{" "}
        <Temperature temp={temperatureLow} size={"1rem"} />
      </span>
    </div>
  );
};

export default DayCard;
