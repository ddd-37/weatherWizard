import React from "react";
import { PropTypes } from "prop-types";

import NewMoon from "./../../../images/New Moon.png";
import WaxCrecent from "./../../../images/Waxing Crescent.png";
import FirstQuarter from "./../../../images/First Quarter.png";
import WaxGibbous from "./../../../images/Waxing Gibbous.png";
import FullMoon from "./../../../images/Full Moon.png";
import WanGibbous from "./../../../images/Waning Gibbous.png";
import ThirdQuarter from "./../../../images/Third Quarter.png";
import WanCrescent from "./../../../images/Waning Crescent.png";

const MoonPhase = ({ phase }) => {
  // Take the moon phase as a percentage, and find which phase we're in
  let roundedPhase = Math.floor((100 * phase) / 12.5);
  let text, src;

  switch (roundedPhase) {
    case 0:
      text = "New Moon";
      src = NewMoon;
      break;
    case 1:
      text = "Waxing Crescent Moon";
      src = WaxCrecent;
      break;
    case 2:
      text = "Quarter Moon";
      src = FirstQuarter;
      break;
    case 3:
      text = "Waxing Gibbous";
      src = WaxGibbous;
      break;
    case 4:
      text = "Full Moon";
      src = FullMoon;
      break;
    case 5:
      text = "Waning Gibbous";
      src = WanGibbous;
      break;
    case 6:
      text = "Last Quarter";
      src = ThirdQuarter;
    case 7:
      text = "Waning Crescent";
      src = WanCrescent;
      break;
  }
  return (
    <>
      <h6 className="d-inline mr-1 font-weight-light">{text}</h6>
      <img src={src} />
    </>
  );
};

MoonPhase.propTypes = {
  phase: PropTypes.number.isRequired
};

export default MoonPhase;
