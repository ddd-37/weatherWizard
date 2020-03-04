import React from "react";
import PropTypes from "prop-types";

const Temperature = ({ temp, size }) => {
  const sizeStyle = {
    fontSize: `${size}`
  };
  return (
    <>
      <span style={sizeStyle}>{Math.floor(temp)}&#176;</span>
    </>
  );
};

Temperature.propTypes = {
  temp: PropTypes.number.isRequired,
  size: PropTypes.string
};

export default Temperature;
