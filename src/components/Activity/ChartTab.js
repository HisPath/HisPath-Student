import { useState } from "react";
import { Line, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Carousel from "react-material-ui-carousel";

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

const plugins = [
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
      "마일리지",
      ["수상"],
      "기술",
      "과정",
      "블로그",
      "인턴",
      "자격증",
      "언어",
    ],
    datasets: [
      {
        label: "내 활동",
        data: [5, 4, 5, 2, 4, 1, 5, 3],
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      {
        label: "학년 평균",
        data: [5, 3, 2, 4, 3, 2, 1, 3],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
      },
    ],
  });

  const [chartDataActivity2, setChartData2] = useState({
    labels: [
      "마일리지",
      ["수상"],
      "기술",
      "과정",
      "블로그",
      "인턴",
      "자격증",
      "언어",
    ],
    datasets: [
      {
        label: "내 활동",
        data: [2, 9, 3, 5, 1, 3, 9, 4],
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      {
        label: "학년 평균",
        data: [5, 3, 2, 4, 3, 2, 1, 3],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
      },
    ],
  });

  return (
    <Box overflow={"auto"} maxHeight="calc(78vh)" maxWidth={"calc(80vw)"}>
      <Box m={1} display={"flex"} justifyContent={"space-evenly"}>
        <Paper sx={{ width: "calc(36vw)" }} elevation={0}>
          {/* <Typography
            style={{
              background: "rgb(238,242,245)",
              padding: "20px 0 8px calc(12vw)",
              fontSize: "1.4rem",
              fontWeight: "bold",
              fontFamily: "ubuntu",
            }}
            color="primary"
          >
            Activity
          </Typography> */}
          <Carousel
            navButtonsAlwaysVisible={true}
            stopAutoPlayOnHover={true}
            navButtonsProps={{
              style: {
                // backgroundColor: "transparent",
                // color: "cornflowerblue",
                backgroundColor: "cornflowerblue",
                opacity: "0.6",
                top: 900,
                // position: "fixed",
                // borderRadius: 0,
              },
            }}
            // navButtonsWrapperProps={{
            //   style: {
            //     bottom: "0",
            //     top: "unset",
            //   },
            // }}
            // height="650px"
          >
            <div
              style={{
                background: "rgb(238,242,245)",
                padding: "20px 0px 21px 0px",
              }}
            >
              <Typography sx={{ ml: 3 }}>2022-1</Typography>
              <Radar
                width={180}
                data={chartDataActivity}
                options={options}
                plugins={plugins}
              />
            </div>
            <div
              style={{
                background: "rgb(238,242,245)",
                padding: "20px 0px 21px 0px",
              }}
            >
              <Typography sx={{ ml: 3 }}>2022-2</Typography>
              <Radar
                width={180}
                data={chartDataActivity2}
                options={options}
                plugins={plugins}
              />
            </div>
          </Carousel>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChartTab;
