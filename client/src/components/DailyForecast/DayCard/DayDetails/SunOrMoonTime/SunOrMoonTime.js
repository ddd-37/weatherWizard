import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

import sunriseIco from "./../../../../../images/sunrise.png";
import sunsetIco from "./../../../../../images/sunset.png";
import moonriseIco from "./../../../../../images/moonrise.png";
import moonsetIco from "./../../../../../images/moonset.png";

const SunOrMoonTime = ({ text, time }) => {
  const humanTime = (time = moment(time * 1000).format("h:mma"));
  let iconSrc;
  switch (text) {
    case "Sunrise":
      iconSrc = sunriseIco;
      break;
    case "Sunset":
      iconSrc = sunsetIco;
      break;
    case "Moonrise":
      iconSrc = moonriseIco;
      break;
    case "Moonset":
      iconSrc = moonsetIco;
      break;
  }
  return (
    <div className="mb-2">
      <h5>{text}</h5>
      <div className="d-flex align-items-center">
        <img src={iconSrc} alt={`${text} time`} />
        <h5 className="ml-2 font-weight-light">{humanTime}</h5>
      </div>
    </div>
  );
};

SunOrMoonTime.propTypes = {
  isSun: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};
export default SunOrMoonTime;
