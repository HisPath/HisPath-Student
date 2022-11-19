// components
import Chart, { useChart } from "../chart";

// ----------------------------------------------------------------------

const series = [
  {
    // name: "Net Profit",
    data: [44],
  },
];

export default function ChartColumnSingle() {
  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: "16%",
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: ["마일리지 총점 순위"],
    },
    tooltip: {
      y: {
        formatter: (value) => `$ ${value} thousands`,
      },
    },
  });

  return (
    <Chart
      type="bar"
      series={series}
      options={chartOptions}
      width={600}
      height={320}
    />
  );
}
