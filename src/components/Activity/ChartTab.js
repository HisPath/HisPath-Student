import { useState } from "react";
import { Line, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { Bar } from "react-chartjs-2";

const options = {
  elements: {
    point: {
      radius: 0, // 점 제거
    },
  },
  legend: {
    display: true,
    labels: {
      boxWidth: 10,
      boxHeight: 50000000, // fontSize에 비례함
      fontSize: 11,
      fontColor: "#263238",
      generateLabels: function (chart) {
        const labels =
          Chart.defaults.global.legend.labels.generateLabels(chart);
        return labels.map((property) => {
          return { ...property, fillStyle: property.strokeStyle };
        });
      },
    },
    position: "bottom",
    // align: "start",
  },
  scale: {
    ticks: { beginAtZero: true, display: false, max: 3, min: 0, stepSize: 1 }, //maxTicksLimit data 최대값의 2배
    pointLabels: {
      fontSize: 24, // radar 차트 fontsize
      fontColor: "primary",
      fontStyle: "bold",
      // padding: 100,
    },
  },
  tooltips: {
    enabled: false,
    mode: "nearest",
    position: "average",
    intersect: false,
  },
};

const pligins = [
  {
    beforeInit: function (chart) {
      chart.legend.afterFit = function () {
        chart.legend.options.labels.padding = 20;
        // chart.height += 30;
      };
    },
  },
];

const ChartTab = () => {
  const [chartDataActivity, setChartData] = useState({
    labels: [
      "교내 활동",
      ["교외", "활동"],
      "수상내역",
      ["또 뭐가", "  있지  "],
    ],
    datasets: [
      {
        label: "내 활동 평균",
        data: [1, 4, 5, 2], // 순서대로 교내, 교외, 수상, 또 뭐가 있지
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      {
        label: "학년 평균",
        data: [5, 3, 2, 4],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
      },
    ],
  });
  const [chartDataLanguage, setChartData1] = useState({
    labels: ["C", "JAVA", "Python"],
    datasets: [
      {
        label: "나의 실력",
        data: [8, 4, 7], // 순서대로 교내, 교외, 수상, 또 뭐가 있지
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      {
        label: "학년 평균 실력",
        data: [6, 8, 9],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
      },
    ],
  });
  const [chartDataMileage, setChartDataMileage] = useState({
    labels: [
      "교내 활동",
      ["교외", "활동"],
      "수상내역",
      ["또 뭐가", "  있지  "],
    ],
    datasets: [
      {
        label: "내 마일리지 평균",
        data: [1, 4, 5, 2], // 순서대로 교내, 교외, 수상, 또 뭐가 있지
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      {
        label: "학년 마일리지 평균",
        data: [5, 3, 2, 4],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
      },
    ],
  });

  return (
    <Box m={3} pb={3} display={"flex"} justifyContent={"space-evenly"}>
      <Paper sx={{ width: "calc(30vw)", m: 2 }}>
        <Typography
          style={{
            background: "rgb(238,242,245)",
            padding: "8px 0 0 calc(9.8vw)",
            fontSize: "1.4rem",
            fontWeight: "bold",
            fontFamily: "ubuntu",
          }}
          color="primary"
        >
          Activity
        </Typography>
        <div
          style={{
            background: "rgb(238,242,245)",
            padding: "20px 10px 21px 10px",
          }}
        >
          <Radar
            width={180}
            data={chartDataActivity}
            options={options}
            plugins={pligins}
          />
        </div>
      </Paper>
      <Paper sx={{ width: "calc(30vw)", m: 2 }}>
        <Typography
          style={{
            background: "rgb(238,242,245)",
            padding: "41px 0 0 calc(8.5vw)",
            fontSize: "1.4rem",
            fontWeight: "bold",
            fontFamily: "ubuntu",
          }}
          color="primary"
        >
          Language
        </Typography>
        <div
          style={{
            background: "rgb(238,242,245)",
            padding: "40px 10px 41px 10px",
          }}
        >
          <Bar
            width={180}
            data={chartDataLanguage}
            options={options}
            plugins={pligins}
          />
        </div>
      </Paper>
      <Paper sx={{ width: "calc(30vw)", m: 2 }}>
        <Typography
          style={{
            background: "rgb(238,242,245)",
            padding: "41px 0 0 calc(8.7vw)",
            fontSize: "1.4rem",
            fontWeight: "bold",
            fontFamily: "ubuntu",
          }}
          color="primary"
        >
          Mileage
        </Typography>
        <div
          style={{
            background: "rgb(238,242,245)",
            padding: "40px 10px 41px 10px",
          }}
        >
          <Line
            width={180}
            data={chartDataMileage}
            options={options}
            plugins={pligins}
          />
        </div>
      </Paper>
    </Box>
  );
};

export default ChartTab;
