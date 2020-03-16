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
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      //Start with a base font of 30px
      ctx.font = "50px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = chart.innerRadius * 2;

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});
const DoughnutChart = ({ arrData }) => {
  //Plugin for center text
  const percent = Math.floor(arrData[0] * 100) + "%";
  console.log("DoughnutChart -> percent", percent);

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
            text: percent,
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
