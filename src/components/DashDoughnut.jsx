import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
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

function DashDoughnut({ data }) {
  let claves = Object.keys(data);
  let valores = Object.values(data);

  const dataDoughnut = {
    labels: claves,
    datasets: [
      {
        label: "# of Votes",
        data: valores,
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0)",
          "rgba(54, 162, 235, 0)",
          "rgba(255, 206, 86, 0)",
          "rgba(75, 192, 192, 0)",
          "rgba(153, 102, 255, 0)",
          "rgba(255, 159, 64, 0)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={dataDoughnut} options={options} />;
}

export default DashDoughnut;
