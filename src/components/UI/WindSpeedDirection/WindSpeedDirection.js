import React from "react";

const WindSpeedDiretion = ({ speed, bearing }) => {
  return (
    <p className="d-inline-block mb-0">
      <span
        className="d-inline-block align-text-top mr-1 "
        style={{
          fontSize: "1.25rem",
          transform: `rotate(${bearing}deg)`
        }}
      >
        &#8593;
      </span>
      {speed} mph{" "}
    </p>
  );
};

export default WindSpeedDiretion;
