import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ arrData }) => {
  console.log("DoughnutChart -> arrData", arrData);
  const data = {
    datasets: [
      {
        backgroundColor: ["#36A2EB", "#676767"],
        borderColor: "transparent",
        data: arrData
      }
    ]
  };

  return (
    <Doughnut
      data={data}
      options={{ cutoutPercentage: 90 }}
      width={100}
      height={100}
    />
  );
};

export default DoughnutChart;
