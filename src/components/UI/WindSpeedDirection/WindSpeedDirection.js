import React from "react";

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

export default WindSpeedDiretion;
