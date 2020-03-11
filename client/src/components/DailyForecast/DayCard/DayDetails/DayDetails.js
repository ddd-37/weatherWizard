import React from "react";
import WindSpeedDiretion from "./../../../UI/WindSpeedDirection/WindSpeedDirection";
import PropTypes from "prop-types";

import SunOrMoonTime from "./SunOrMoonTime/SunOrMoonTime";

// Todo - need to fix the time, if I run through a VPN the time is always off,
// For example I'm in MST but if I set my IP to florida the time is still returned as if I'm in Colorado
const DayDetails = props => {
  console.log("DayDetails - props", props);
  let {
    time,
    windSpeed,
    windBearing,
    humidity,
    uvIndex,
    sunriseTime,
    sunsetTime,
    summary
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
          Sunrise/sunset {sunriseTime}/{sunsetTime}
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
              <SunOrMoonTime text={"Moonrise"} time={sunriseTime} />
              <SunOrMoonTime text={"Moonset"} time={sunsetTime} />
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-2">
            <div className="p-1 border-top"></div>
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
