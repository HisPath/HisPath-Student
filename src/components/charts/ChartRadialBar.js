// @mui
import { useTheme } from "@mui/material/styles";
// utils
import { fNumber } from "../../utils/formatNumber";
// components
import Chart, { useChart } from "../chart";
import { useState } from "react";
// API
import { getChartRank } from "../../api/chart";
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
  const [myPoint, setMypoint] = useState([]);
  const [aTotalW, setATotalW] = useState([]);
  const [mTotalW, setMTotalW] = useState([]);

  const series = [totalAverage, studentAverage];

  const getChartData = (semester) => {
    getChartRank(semester).then((data) => {
      setDatas(data);
    });
  };

  const getATotalWeight = () => {
    setATotalW(Math.round(datas.avgTotalWeight));
  };

  const getMTotalWeight = () => {
    setMTotalW(Math.round(datas.myTotalWeight));
  };

  const getTotalAverage = () => {
    setTotalAverage(
      Math.round(
        (Math.round(datas.avgTotalWeight) / Math.round(datas.maxTotalWeight)) *
          100
      )
    );
  };

  const getStuAverage = () => {
    setStudentAverage(
      Math.round(
        (Math.round(datas.myTotalWeight) / Math.round(datas.maxTotalWeight)) *
          100
      )
    );
  };

  const calValue = () => {
    setStuValue(100 - studentAverage + 1);
    setTotalValue(100 - totalAverage + 1);
  };

  const getMyPoint = () => {
    setMypoint(datas.myTotalWeight);
  };

  useEffect(() => {
    getChartData(semester);
  }, [semester, totalAverage]);

  useEffect(() => {
    getTotalAverage();
    getStuAverage();
    getMyPoint();
    getATotalWeight();
    getMTotalWeight();
    calValue();
  }, [datas]);

  const chartOptions = useChart({
    labels: [
      "전체 학생 평균 마일리지 총점(" + aTotalW + "점 상위" + totalValue + "%)",
      "내 마일리지 총점(" + mTotalW + "점 상위" + stuValue + "%)",
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
