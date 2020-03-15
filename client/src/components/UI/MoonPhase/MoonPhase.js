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
  console.log("MoonPhase -> phase", phase);
  console.log("MoonPhase -> phase", 0.52 < phase);
  let text, src;

  if (phase < 0.2) {
    text = "New Moon";
    src = NewMoon;
  } else if (phase < 0.25) {
    text = "Waxing Crescent Moon";
    src = WaxCrecent;
  } else if (phase < 0.28) {
    text = "Quarter Moon";
    src = FirstQuarter;
  } else if (phase < 0.5) {
    text = "Waxing Gibbous";
    src = WaxGibbous;
  } else if (phase < 0.52) {
    text = "Full Moon";
    src = FullMoon;
  } else if (phase < 0.75) {
    text = "Waning Gibbous";
    src = WanGibbous;
  } else if (phase < 0.78) {
    text = "Last Quarter";
    src = ThirdQuarter;
  } else if (phase < 1) {
    text = "Waning Crescent";
    src = WanCrescent;
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
