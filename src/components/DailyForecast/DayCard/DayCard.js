import React from "react";
import WeatherIcon from "../../UI/WeatherIcon/WeatherIcon";
import Temperature from "../../UI/Temperature/Temperature";
import DayDetails from "./../DayCard/DayDetails/DayDetails";

const DayCard = ({
  day,
  icon,
  temperatureHigh,
  temperatureLow,
  selected,
  dayToDisplay,
  clicked
}) => {
  console.log(selected);
  return (
    <div className="border border-light m-1 p-1" onClick={clicked}>
      <div
        className="d-flex flex-row flex-md-column justify-content-around"
        style={{ minWidth: "5rem" }}
      >
        <h6>{day}</h6>
        <WeatherIcon icon={icon} size={30} />
        <span>
          <Temperature temp={temperatureHigh} size={"1.5rem"} />{" "}
          <Temperature temp={temperatureLow} size={"1rem"} />
        </span>
        <span>{selected ? "-" : "+"}</span>
      </div>
      {selected && <DayDetails data={dayToDisplay} />}
    </div>
  );
};

export default DayCard;
