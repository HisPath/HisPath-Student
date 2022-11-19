// components
import Chart, { useChart } from "../chart";

// ----------------------------------------------------------------------

const series = [
  {
    name: "카테고리별 전체 학생 평균 ",
    type: "column",
    data: [50, 70, 40, 100, 90, 60],
  },
  {
    name: "내 평균",
    type: "line",
    data: [30, 25, 36, 30, 45, 35],
  },
];

export default function ChartMixed() {
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
    labels: [
      "전공 마일리지",
      "산학 마일리지",
      "비교과-연구활동",
      "비교과-특강참여",
      "비교과-행사참여",
      "비교과-학회활동",
    ],
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
