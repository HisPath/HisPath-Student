// @mui
import { useTheme } from "@mui/material/styles";
// components
import Chart, { useChart } from "../chart";

const series = [
  {
    name: "동학년 카테고리별 평균 분포",
    data: [80, 50, 30, 40, 90, 20],
  },
  {
    name: "내 카테고리별 평균 분포",
    data: [20, 30, 40, 80, 20, 80],
  },
];

export default function ChartRadarBar() {
  const theme = useTheme();

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
    xaxis: {
      categories: [
        "전공 마일리지",
        "산학 마일리지",
        "비교과-연구활동",
        "비교과-특강참여",
        "비교과-행사참여",
        "비교과-학회활동",
      ],
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
