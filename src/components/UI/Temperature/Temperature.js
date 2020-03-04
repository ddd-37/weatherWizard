import React from "react";
import PropTypes from "prop-types";

const Temperature = ({ temp }) => {
  return (
    <>
      <span>{Math.floor(temp)}&#176;</span>
    </>
  );
};

Temperature.propTypes = {
  temp: PropTypes.number.isRequired
};

export default Temperature;
