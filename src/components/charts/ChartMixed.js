// components
import Chart, { useChart } from "../chart";

import { useState } from "react";
import { getChartPopularity } from "../../api/chart";
import { useRecoilValue } from "recoil";
import { semesterState } from "../../store/atom";
import { useEffect } from "react";

export default function ChartMixed() {
  const [datas, setDatas] = useState([]);
  const semester = useRecoilValue(semesterState);
  const [studentAverage, setStudentAverage] = useState([]);
  const [totalAverage, setTotalAverage] = useState([]);

  const getChartData = (semester) => {
    getChartPopularity(semester).then((data) => {
      setDatas(data);
      // console.log(datas);
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
  }, []);

  useEffect(() => {
    getChartData(semester);
  }, [semester]);

  useEffect(() => {
    getTotalAveragePerCate();
    getStuAveragePerCate();
  }, [datas]);

  const series = [
    {
      name: "카테고리별 전체 학생 평균 ",
      type: "column",
      data: studentAverage,
    },
    {
      name: "내 평균",
      type: "line",
      data: totalAverage,
    },
  ];
  const chartOptions = useChart({
    stroke: {
      width: [0, 2, 3],
    },
    plotOptions: {
      bar: { columnWidth: "20%" },
    },
    fill: {
      type: ["solid", "solid"],
    },
    labels: datas.map((item) => item.categoryName),
    xaxis: {},
    yaxis: {
      title: { text: "Points" },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== "undefined") {
            return `${value.toFixed(0)} points`;
          }
          return value;
        },
      },
    },
  });

  return (
    <Chart type="line" series={series} options={chartOptions} height={370} />
  );
}
