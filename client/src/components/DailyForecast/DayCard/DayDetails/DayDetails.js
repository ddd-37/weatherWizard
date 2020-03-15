import React, { useEffect, useState } from "react";
import WindSpeedDiretion from "./../../../UI/WindSpeedDirection/WindSpeedDirection";
import PropTypes from "prop-types";

import SunOrMoonTime from "./SunOrMoonTime/SunOrMoonTime";
import HourMinTime from "../../../UI/Time/HourMinTime/HourMinTime";
import MoonPhase from "../../../UI/MoonPhase/MoonPhase";
import DoughnutChart from "../../../UI/DoughutChart/DoughnutChart";

// Todo - need to fix the time, if I run through a VPN the time is always off,
// For example I'm in MST but if I set my IP to florida the time is still returned as if I'm in Colorado
const DayDetails = props => {
  console.log("props", props);
  let {
    time,
    windSpeed,
    windBearing,
    humidity,
    uvIndex,
    sunriseTime,
    sunsetTime,
    moonrise,
    moonset,
    moonPhase,
    summary,
    precipProbability
  } = props.data;

  if (!props.isDesktop) {
    return (
      <div>
        <span>
          Wind <WindSpeedDiretion speed={windSpeed} bearing={windBearing} />
        </span>
        <span>Humidiity {humidity * 100}</span>
        <span>UV Index {uvIndex}</span>
        <span>
          Sunrise/sunset <HourMinTime time={sunriseTime} />/{" "}
          <HourMinTime time={sunsetTime} />
        </span>
      </div>
    );
  } else {
    return (
      <div className="mt-4">
        <h3>Day Details</h3>
        <div className="row my-3">
          <div className="col-lg-3 col-md-4 col-sm-2">
            <div className="p-2 border-top">
              <h5 className="font-weight-bold">Summary</h5>
              <h6 className="font-weight-light">{summary}</h6>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-2">
            <div className="p-1 border-top">
              <SunOrMoonTime text={"Sunrise"} time={sunriseTime} />
              <SunOrMoonTime text={"Sunset"} time={sunsetTime} />
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-2">
            <div className="p-1 border-top">
              <SunOrMoonTime text={"Moonrise"} time={moonrise} />
              <SunOrMoonTime text={"Moonset"} time={moonset} />
              <h5 className="m-0">Moon Phase</h5>
              <MoonPhase phase={moonPhase} />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-2">
            <div className="border-top">
              <div className="row container d-flex justify-content-between">
                <div>
                  <h6>Precipitation</h6>
                  <DoughnutChart
                    arrData={[precipProbability, 1 - precipProbability]}
                  />
                </div>
                <div>
                  <h6>Humidity</h6>
                  <DoughnutChart arrData={[humidity, 1 - humidity]} />
                </div>
              </div>
              <div className="row container d-flex justify-content-between">
                <div>
                  <h6>UV Index</h6>
                  <DoughnutChart
                    arrData={[precipProbability, 1 - precipProbability]}
                  />
                </div>
                <div>
                  <h6>Max Wind</h6>
                  <DoughnutChart arrData={[humidity, 1 - humidity]} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-2">
            <div className="p-1 border-top"></div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-2">
            <div className="p-1 border-top"></div>
          </div>
        </div>
      </div>
    );
  }
};

DayDetails.propTypes = {
  data: PropTypes.shape({
    windSpeed: PropTypes.number.isRequired,
    windBearing: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    uvIndex: PropTypes.number.isRequired,
    sunriseTime: PropTypes.number.isRequired,
    sunsetTime: PropTypes.number.isRequired
  }),
  isDesktop: PropTypes.bool.isRequired
};

export default DayDetails;
