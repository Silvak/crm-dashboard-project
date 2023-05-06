import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, data2 }) => {
  //grafica
  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };
  const labels = data.map((item) => item["Ciudad de facturación"]);
  const dataChart = {
    labels,
    datasets: [
      {
        label: "Presupuestos",
        data: data.map((item) => item["Total general"]),
        backgroundColor: "#327ED5",
      },
      {
        label: "Tratos",
        data: data2.map((item) => item["Importe"]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={dataChart} />;
};

export default LineChart;
