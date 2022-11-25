// @mui
import { useTheme } from "@mui/material/styles";
// components
import Chart, { useChart } from "../chart";

//API
import { getChart } from "../../api/activity";
import { useEffect } from "react";
import { useState } from "react";

export default function RadarChart({ semester }) {
  const theme = useTheme();
  const [datas, setDatas] = useState([]);
  const [studentAverage, setStudentAverage] = useState([]);
  const [totalAverage, setTotalAverage] = useState([]);

  const series = [
    {
      name: "동학년 카테고리별 평균 분포",
      data: totalAverage,
    },
    {
      name: "내 카테고리별 평균 분포",
      data: studentAverage,
    },
  ];
  const getChartData = (semester) => {
    getChart(semester).then((data) => {
      setDatas(data);
    });
  };
  const getTotalAveragePerCate = () => {
    setTotalAverage(datas.map((item) => item.avgCnt));
  };

  const getStuAveragePerCate = () => {
    setStudentAverage(datas.map((item) => item.myCnt));
  };

  useEffect(() => {
    getChartData(semester);
  }, [semester]);

  useEffect(() => {
    getTotalAveragePerCate();
    getStuAveragePerCate();
  }, [datas]);

  const chartOptions = useChart({
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.48,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },

    // yaxis: {
    //   max: 30,
    //   min: 0,
    // },
    xaxis: {
      categories: datas.map((item) => item.section),
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
          ],
        },
      },
    },
  });

  return (
    <Chart type="radar" series={series} options={chartOptions} width={600} />
  );
}
