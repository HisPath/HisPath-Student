import { useState } from "react";
import { Line, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Bar } from "react-chartjs-2";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { getActivities, getCategories } from "../../api/mileage";
import { Card, Grid, Container, CardHeader, CardContent } from "@mui/material";

import {
  ChartBar,
  // ChartColumnStacked,
  // ChartColumnSingle,
  ChartRadialBar,
  ChartLine,
  ChartMixed,
  ChartsRadarBar,
} from "../charts";

import ApexCharts from "react-apexcharts";

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
  const [chartDataMileage, setChartData] = useState({
    labels: [
      "교내 활동",
      "전공 마일리지",
      "산학 마일리지 ",
      "비교과-연구활동",
      "기타",
      "비교과-특강참여",
      "비교과-행사참여",
      "비교과-학회활동",
    ],
    datasets: [
      {
        label: "내 활동 분포",
        data: [1, 1, 2, 4, 3, 2, 3, 5],
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      {
        label: "학년 평균 분포",
        data: [2, 2, 2, 2, 5, 3, 4, 4],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
      },
    ],
    // 분포 , 평균
  });

  const [chartDataPopularity, setChartDataPopularity] = useState({
    labels: [
      "교내 활동",
      "전공 마일리지",
      "산학 마일리지 ",
      "비교과-연구활동",
      "기타",
      "비교과-특강참여",
      "비교과-행사참여",
      "비교과-학회활동",
    ],
    datasets: [
      {
        label: "참여 인원 수",
        data: [50, 40, 60, 50, 40, 30, 50, 70], // 순서대로 교내, 교외, 수상, 또 뭐가 있지
        backgroundColor: "rgba(142, 202, 206, 0.2)",
        borderColor: "rgb(0, 156, 242)",
        borderWidth: 1.5,
      },
      // {
      //   label: "학년 평균 실력",
      //   data: [6, 8, 9],
      //   backgroundColor: "rgba(243, 229, 185, 0.2)",
      //   borderColor: "rgb(255, 183, 0)",
      //   borderWidth: 1.5,
      // },
    ],
  });

  const [chartDataRank, setChartDataRank] = useState({
    labels: ["최저점수", "내 점수(상위 10%)", "최고점수"],

    datasets: [
      {
        label: "최고점: 200점",
        data: [0, 170, 200],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  });
  const [chartDataTimeline, setChartDataTimeline] = useState({
    labels: [
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      // "교내 활동",
      // "전공 마일리지",
      // "산학 마일리지 ",
      // "비교과-연구활동",
      // "기타",
      // "비교과-특강참여",
      // "비교과-행사참여",
      // "비교과-학회활동",
    ],
    datasets: [
      {
        label: "내 마일리지 활동 개수",
        data: [9, 5, 7, 8, 10],
        backgroundColor: "rgba(243, 229, 185, 0.2)",
        borderColor: "rgb(255, 183, 0)",
        borderWidth: 1.5,
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  });
  const [activities, setActivities] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  // const getActivities = async () => {
  //   const activity = await axios.get(
  //     `${process.env.REACT_APP_SERVER}/studentmileage/1`
  //   );
  //   setActivities(activity.data.activities);
  // };

  // const getCategories = async () => {
  //   const category = await axios.get(
  //     `${process.env.REACT_APP_SERVER}/api/categories`
  //   );
  //   setCategories(category.data);
  // };

  useEffect(() => {
    const fetchCate = async () => {
      const cate = await getCategories();
      setCategories(cate);
    };
    fetchCate();

    const fetchAct = async () => {
      const act = await getActivities();
      setActivities(act);
    };
    fetchAct();
  }, []);

  const chartData = [
    <Box
      sx={{
        pt: 6,
        pb: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "grey.200" : "grey.800",
        borderRadius: "20px",
      }}
    >
      <Container>
        <Grid item xs={12} md={6}>
          <Card dir="ltr">
            <CardHeader title="Mixed" />
            <CardContent
              sx={{
                height: 420,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChartMixed />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Box>,
    <Box
      sx={{
        pt: 6,
        pb: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "light" ? "grey.200" : "grey.800",
        borderRadius: "20px",
      }}
    >
      <Container>
        <Grid item xs={12} md={6}>
          <Card dir="ltr">
            <CardHeader title="Mixed" />
            <CardContent
              sx={{
                height: 420,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChartMixed />
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Box>,
  ];

  return (
    <Box overflow={"auto"} maxHeight="calc(78vh)">
      <Box m={1} display={"flex"} justifyContent={"space-evenly"}>
        <Paper sx={{ width: "calc(50vw)" }} elevation={0}>
          <Carousel
            navButtonsAlwaysVisible={true}
            stopAutoPlayOnHover={true}
            navButtonsProps={{
              style: {
                backgroundColor: "cornflowerblue",
                // borderRadius: 0,
              },
            }}
            // navButtonsWrapperProps={{
            //   style: {
            //     marginLeft: "40",
            //   },
            // }}
            height="550px"
          >
            <Box
              sx={{
                pt: 6,
                pb: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "grey.200" : "grey.800",
                borderRadius: "20px",
              }}
            >
              <Container>
                <Grid item>
                  <Card dir="ltr">
                    <CardHeader title="내 마일리지 분포" />
                    <CardContent
                      sx={{
                        height: 420,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ChartsRadarBar />
                    </CardContent>
                  </Card>
                </Grid>
              </Container>
            </Box>
            <Box
              sx={{
                pt: 6,
                pb: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "grey.200" : "grey.800",
                borderRadius: "20px",
              }}
            >
              <Container>
                <Grid item>
                  <Card dir="ltr">
                    <CardHeader title="마일리지 참여 학생 수" />
                    <CardContent
                      sx={{
                        width: 1000,
                        height: 420,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                      }}
                    >
                      <ChartMixed />
                    </CardContent>
                  </Card>
                </Grid>
              </Container>
            </Box>
            <Box
              sx={{
                pt: 6,
                pb: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "grey.200" : "grey.800",
                borderRadius: "20px",
              }}
            >
              <Container>
                <Grid item xs={12} md={6}>
                  <Card dir="ltr">
                    <CardHeader title="내 마일리지 총점 순위" />
                    <CardContent
                      sx={{
                        width: 650,
                        height: 420,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                      }}
                    >
                      <ChartRadialBar />
                    </CardContent>
                  </Card>
                </Grid>
              </Container>
            </Box>
            <Box
              sx={{
                pt: 6,
                pb: 1,
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "grey.200" : "grey.800",
                borderRadius: "20px",
              }}
            >
              <Container>
                <Grid item xs={12} md={6}>
                  <Card dir="ltr">
                    <CardHeader title="내 마일리지 성장 타임라인" />
                    <CardContent
                      sx={{
                        width: 1000,
                        height: 420,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                      }}
                    >
                      <ChartLine />
                    </CardContent>
                  </Card>
                </Grid>
              </Container>
            </Box>
            {/* <div
              style={{
                // background: "rgb(238,242,245)",
                padding: "20px 0px 21px 0px",
                height: "350px",
              }}
            >
              <Typography sx={{ ml: 3 }}>Mileage</Typography>

              <Radar
                width={180}
                data={chartDataMileage}
                options={options}
                plugins={plugins}
              />
            </div>
            <div
              style={{
                // background: "rgb(238,242,245)",
                padding: "20px 0px 21px 0px",
                height: "350px",
              }}
            >
              <Typography sx={{ ml: 3 }}>Popularity</Typography>
              <Bar
                width={180}
                data={chartDataPopularity}
                options={options}
                plugins={plugins}
              />
            </div>
            <div
              style={{
                // background: "rgb(238,242,245)",
                padding: "20px 0px 21px 0px",
                height: "350px",
              }}
            >
              <Typography sx={{ ml: 3 }}>Rank</Typography>
              <Line
                width={180}
                data={chartDataRank}
                options={options}
                plugins={plugins}
              />
            </div> */}
          </Carousel>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChartTab;
