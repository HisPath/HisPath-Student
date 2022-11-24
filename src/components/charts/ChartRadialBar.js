// @mui
import { useTheme } from "@mui/material/styles";
// utils
import { fNumber } from "../../utils/formatNumber";
// components
import Chart, { useChart } from "../chart";
import { useState } from "react";
// API
import { getChartRank } from "../../api/chart";
import { ConstructionOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { semesterState } from "../../store/atom";

export default function ChartRadialBar() {
  const theme = useTheme();
  const [datas, setDatas] = useState([]);
  const semester = useRecoilValue(semesterState);
  const [studentAverage, setStudentAverage] = useState([]);
  const [totalAverage, setTotalAverage] = useState([]);
  const [stuValue, setStuValue] = useState([]);
  const [totalValue, setTotalValue] = useState([]);
  // const [totalValue, setTotalValue] = useState([]);
  const series = [totalAverage, studentAverage];
  const [myPoint, setMypoint] = useState([]);

  const getChartData = (semester) => {
    getChartRank(semester).then((data) => {
      setDatas(data);
      // console.log(datas);
    });
  };

  const getTotalAverage = () => {
    setTotalAverage(
      Math.floor((datas.avgTotalWeight / datas.maxTotalWeight) * 100)
    );
  };

  const getStuAverage = () => {
    setStudentAverage(
      Math.floor((datas.myTotalWeight / datas.maxTotalWeight) * 100)
    );
  };

  const calValue = () => {
    // const v = 100 - studentAverage;
    // setStuValue(v);
    setStuValue(100 - studentAverage);
    setTotalValue(100 - totalAverage);
  };

  const getMyPoint = () => {
    setMypoint(datas.myTotalWeight);
  };

  useEffect(() => {
    getChartData(semester);
  }, []);

  useEffect(() => {
    getChartData(semester);
    getMyPoint();
    calValue();
    // console.log(semester);
  }, [semester]);

  useEffect(() => {
    getTotalAverage();
    getStuAverage();
    calValue();
    getMyPoint();
  }, [datas]);

  const chartOptions = useChart({
    labels: [
      "전체 학생 평균 마일리지 총점(" +
        Math.floor(datas.avgTotalWeight) +
        "점 상위" +
        totalValue +
        "%)",
      // `전체 학생 평균 마일리지 총점(60)`,
      "내 마일리지 총점(" +
        Math.floor(datas.myTotalWeight) +
        "점 상위" +
        stuValue +
        "%)",
      // "내 마일리지 총점(상위 10%)",
    ],
    fill: {
      type: "gradient",
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 100, color: theme.palette.primary.main },
          ],
          [
            { offset: 0, color: theme.palette.info.light },
            { offset: 100, color: theme.palette.info.main },
          ],
        ],
      },
    },
    legend: {
      horizontalAlign: "center",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "68%",
        },
        dataLabels: {
          value: {
            offsetY: 16,
          },
          total: {
            formatter: () => fNumber(myPoint),
          },
        },
      },
    },
  });

  return (
    <Chart
      type="radialBar"
      series={series}
      options={chartOptions}
      height={600}
    />
  );
}
