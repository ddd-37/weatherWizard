import React from "react";
import WeatherIcon from "../../UI/WeatherIcon/WeatherIcon";
import Temperature from "../../UI/Temperature/Temperature";

const DayCard = ({ day, icon, temperatureHigh, temperatureLow }) => {
  return (
    <div style={{ minWidth: "5rem", marginBottom: "1rem" }}>
      <h6>{day}</h6>
      <WeatherIcon icon={icon} size={30} />
      <span>
        <Temperature temp={temperatureHigh} size={"1.5rem"} />{" "}
        <Temperature temp={temperatureLow} size={"1rem"} />
      </span>
    </div>
  );
};

export default DayCard;
