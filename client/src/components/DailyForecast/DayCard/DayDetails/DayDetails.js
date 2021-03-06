import React from "react";
import WindSpeedDiretion from "./../../../UI/WindSpeedDirection/WindSpeedDirection";
import PropTypes from "prop-types";

import SunOrMoonTime from "./SunOrMoonTime/SunOrMoonTime";
import HourMinTime from "../../../UI/Time/HourMinTime/HourMinTime";
import MoonPhase from "../../../UI/MoonPhase/MoonPhase";
import DoughnutChart from "../../../UI/DoughutChart/DoughnutChart";

// Todo - need to fix the time, if I run through a VPN the time is always off,
// For example I'm in MST but if I set my IP to florida the time is still returned as if I'm in Colorado
const DayDetails = props => {
  const {
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
        <h6>{summary}</h6>
        <div className="d-flex flex-row">
          <div className="d-flex flex-column">
            <h6>Wind:</h6>
            <h6>Humidiity:</h6>
            <h6>UV Index:</h6>
            <h6>Sunrise/sunset:</h6>
          </div>
          <div className="d-flex flex-column ml-5">
            <h6>
              <WindSpeedDiretion speed={windSpeed} bearing={windBearing} />
            </h6>
            <h6> {Math.floor(humidity * 100) + "%"}</h6>
            <h6> {uvIndex}</h6>
            <h6>
              <HourMinTime time={sunriseTime} />/{" "}
              <HourMinTime time={sunsetTime} />
            </h6>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-4">
        <div className="d-flex align-items-center">
          <h3 className="mr-2">Day Details </h3>
          <h5 className="font-weight-light">- {summary}</h5>
        </div>
        <div className="row d-flex justify-content-center my-3 p-3">
          <div className="col-lg-3 col-md-3">
            <div className="p-1 border-top">
              <SunOrMoonTime text={"Sunrise"} time={sunriseTime} />
              <SunOrMoonTime text={"Sunset"} time={sunsetTime} />
            </div>
          </div>

          <div className="col-lg-3 col-md-3">
            <div className="p-1 border-top">
              <SunOrMoonTime text={"Moonrise"} time={moonrise} />
              <SunOrMoonTime text={"Moonset"} time={moonset} />
              <h5 className="m-0">Moon Phase</h5>
              <MoonPhase phase={moonPhase} />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="border-top">
              <div className="row container d-flex flex-row justify-content-between">
                <div>
                  <h6>Precipitation</h6>
                  <DoughnutChart
                    arrData={[precipProbability, 1 - precipProbability]}
                    isPercentage={true}
                  />
                </div>
                <div>
                  <h6>Humidity</h6>
                  <DoughnutChart
                    arrData={[humidity, 1 - humidity]}
                    isPercentage={true}
                  />
                </div>
                <div>
                  <h6>UV Index</h6>
                  <DoughnutChart arrData={[uvIndex, 10 - uvIndex]} />
                </div>
              </div>
            </div>
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
