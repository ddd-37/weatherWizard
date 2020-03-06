import React from "react";
import PropTypes from "prop-types";

const WindSpeedDiretion = ({ speed, bearing }) => {
  return (
    <span className="d-inline-block mb-0">
      <span
        className="d-inline-block  mr-1 "
        style={{
          transform: `rotate(${bearing}deg)`
        }}
      >
        &#8593;
      </span>
      {speed} mph{" "}
    </span>
  );
};

WindSpeedDiretion.propTypes = {
  speed: PropTypes.number.isRequired,
  bearing: PropTypes.number.isRequired
};

export default WindSpeedDiretion;
