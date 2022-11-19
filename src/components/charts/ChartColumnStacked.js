// // components
// import Chart, { useChart } from "../chart";

// // ----------------------------------------------------------------------

// const series = [
//   { name: "나보다 낮은 마일리지 총점", data: [70%] },
//   { name: "내 마일리지 총점", data: [1] },
//   { name: "나보다 높은 마일리지 총점", data: [50%] },
//   // { name: "Product D", data: [21] },
// ];

// export default function ChartColumnStacked() {
//   const chartOptions = useChart({
//     chart: {
//       stacked: true,
//       zoom: {
//         enabled: true,
//       },
//     },
//     legend: {
//       itemMargin: {
//         vertical: 8,
//       },
//       position: "right",
//       offsetY: 20,
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: "16%",
//       },
//     },
//     stroke: {
//       show: false,
//     },
//     xaxis: {},
//   });

//   return (
//     <Chart
//       type="bar"
//       series={series}
//       options={chartOptions}
//       width={600}
//       height={320}
//     />
//   );
// }
