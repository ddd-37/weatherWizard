import React from "react";
import moment from "moment";

const HourMinTime = ({ time }) => {
  console.log("time", time);
  return <span>{moment(time * 1000).format("LT")}</span>;
};

export default HourMinTime;
