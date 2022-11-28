// @mui
import { useTheme } from "@mui/material/styles";
// components
import Chart, { useChart } from "../chart";

//API
import { getChartPopularity } from "../../api/chart";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { semesterState } from "../../store/atom";
import { useState } from "react";

export default function ChartRadarBar() {
  const theme = useTheme();
  const semester = useRecoilValue(semesterState);
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
    getChartPopularity(semester).then((data) => {
      setDatas(data);
    });
  };
  const getTotalAveragePerCate = () => {
    setTotalAverage(
      datas.map((item) => (item.averageCnt / item.totalCategoryCnt) * 100)
    );
    // console.log(totalAverage);
  };

  const getStuAveragePerCate = () => {
    setStudentAverage(
      datas.map((item) => (item.myCnt / item.totalCategoryCnt) * 100)
    );
    // console.log(studentAverage);
  };

  useEffect(() => {
    getChartData(semester);
    console.log(datas);
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

    yaxis: {
      max: 100,
      min: 0,
    },
    xaxis: {
      categories: datas.map((item) => item.categoryName),
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
