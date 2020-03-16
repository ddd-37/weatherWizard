import React from "react";
import { Chart, Doughnut } from "react-chartjs-2";
Chart.pluginService.register({
  beforeDraw: function(chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || "Arial";
      var txt = centerConfig.text;
      var color = centerConfig.color || "#000";

      //Start with a base font of 30px

      //Set font settings to draw it correctly.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = "26px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});
const DoughnutChart = ({ arrData, isPercentage }) => {
  //Plugin for center text

  const text = isPercentage ? Math.floor(arrData[0] * 100) + "%" : arrData[0];

  const data = {
    datasets: [
      {
        backgroundColor: ["#fff", "#676767"],
        borderColor: "transparent",
        data: arrData
      }
    ]
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutoutPercentage: 90,
        elements: {
          center: {
            text: text,
            color: "#fff", //Default black
            fontStyle: "Helvetica", //Default Arial
            sidePadding: 15 //Default 20 (as a percentage)
          }
        }
      }}
      width={100}
      height={100}
    />
  );
};

export default DoughnutChart;
