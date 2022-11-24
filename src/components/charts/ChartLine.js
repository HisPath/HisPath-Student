// components
import Chart, { useChart } from "../chart";

import { getChartTimeline } from "../../api/chart";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { semesterState } from "../../store/atom";
import { useState } from "react";

export default function ChartLine() {
  const semester = useRecoilValue(semesterState);
  const [datas, setDatas] = useState([]);
  const [sem, setSem] = useState([]);
  const [weightValue, setWeightValue] = useState([]);

  const getChartData = (semester) => {
    getChartTimeline(semester).then((data) => {
      setDatas(data);
    });
    console.log(datas);
  };

  const getSem = () => {
    setSem(datas.map((item) => item.semester));
  };

  const getWeightValue = () => {
    setWeightValue(datas.map((item) => item.totalWeight));
  };

  useEffect(() => {
    getChartData(semester);
  }, []);

  useEffect(() => {
    getSem();
    getWeightValue();
  }, [datas]);

  useEffect(() => {
    getChartData(semester);
  }, [semester]);

  const series = [
    {
      name: "학기별 내 마일리지 포인트",
      data: weightValue,
    },
  ];

  const chartOptions = useChart({
    xaxis: {
      categories: sem,
    },
    yaxis: { title: { text: "마일리지 포인트 총점" } },
    tooltip: {
      x: {
        show: false,
      },
      marker: { show: false },
    },
  });

  return (
    <Chart type="line" series={series} options={chartOptions} height={320} />
  );
}
