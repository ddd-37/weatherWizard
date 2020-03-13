import React from "react";
import moment from "moment";

const HourMinTime = ({ time }) => {
  if (typeof time === "number") {
    return <span>{moment(time * 1000).format("LT")}</span>;
  }
  console.log("time", time);
  console.log("time", moment(time, "HH:mm").format("h:mm a"));
  return <span>{moment(time, "HH:mm").format("h:mm A")}</span>;
};

export default HourMinTime;
