import React from "react";
import WeatherIcon from "../../UI/WeatherIcon/WeatherIcon";
import Temperature from "../../UI/Temperature/Temperature";
import DayDetails from "./../DayCard/DayDetails/DayDetails";

const DayCard = ({
  id,
  day,
  icon,
  temperatureHigh,
  temperatureLow,
  selected,
  clicked,
  isDesktop,
  dataForDay
}) => {
  return (
    <div className="border border-light m-1 p-2" id={id} onClick={clicked}>
      <div
        className="d-flex flex-row flex-md-column justify-content-between"
        style={{ minWidth: "5rem" }}
      >
        <h6 className="flex-fill">{day}</h6>
        <WeatherIcon icon={icon} size={30} />
        <span className="mx-4 mx-md-0">
          <Temperature temp={temperatureHigh} size={"1.5rem"} />{" "}
          <Temperature temp={temperatureLow} size={"1rem"} />
        </span>
        {isDesktop || <span>{selected ? "-" : "+"}</span>}
      </div>
      {!isDesktop && selected && (
        <DayDetails data={dataForDay} isDesktop={isDesktop} />
      )}
    </div>
  );
};

export default DayCard;
