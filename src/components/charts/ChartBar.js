// components
import Chart, { useChart } from "../chart";

// ----------------------------------------------------------------------

const series = [{ data: [400] }];

export default function ChartBar() {
  const chartOptions = useChart({
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: "10%" },
    },
    xaxis: {
      categories: [""],
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
