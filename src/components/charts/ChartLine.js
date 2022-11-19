// components
import Chart, { useChart } from "../chart";

// ----------------------------------------------------------------------

const series = [
  {
    name: "내가 참여한 마일리지 활동 수",
    data: [10, 40, 30, 50, 40, 60, 60, 80, 70],
  },
];

export default function ChartLine() {
  const chartOptions = useChart({
    xaxis: {
      categories: [
        "18-2",
        "19-1",
        "19-2",
        "20-1",
        "20-2",
        "21-1",
        "21-2",
        "22-1",
        "22-2",
      ],
    },
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
