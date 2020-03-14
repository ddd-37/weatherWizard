import React from "react";
import moment from "moment";

const HourMinTime = ({ time }) => {
  if (typeof time === "number") {
    return <span>{moment(time * 1000).format("LT")}</span>;
  }

  return <span>{moment(time, "HH:mm").format("h:mm A")}</span>;
};

export default HourMinTime;
