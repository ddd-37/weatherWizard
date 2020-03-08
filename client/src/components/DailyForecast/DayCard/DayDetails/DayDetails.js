import React from "react";
import WindSpeedDiretion from "../../../UI/WindSpeedDirection/WindSpeedDirection";
import moment from "moment";
import PropTypes from "prop-types";

// Todo - need to fix the time, if I run through a VPN the time is always off,
// For example I'm in MST but if I set my IP to florida the time is still returned as if I'm in Colorado
const DayDetails = props => {
  console.log("DayDetails - props", props);
  const {
    time,
    windSpeed,
    windBearing,
    humidity,
    uvIndex,
    sunriseTime,
    sunsetTime
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
          Sunrise/sunset {moment(sunriseTime * 1000).format("h:mma")}/
          {moment(sunsetTime * 1000).format("h:mma")}
        </span>
      </div>
    );
  } else {
    return <div>Day Details{moment(time * 1000).format("dd")}</div>;
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
