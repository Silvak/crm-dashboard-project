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
  const labels = data.map((item) => item["Ciudad de facturación"]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 12,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Leyenda desactivada
      },
      title: {
        display: true,
        text: "",
        color: "#222",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          bottom: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.formattedValue;
            return `${label}: $${value}`;
          },
        },
      },
    },
  };

  const dataChart = {
    labels: Array(labels.length).fill(""),
    datasets: [
      {
        label: "Presupuestos",
        data: data.map((item) => item["Total general"]),
        backgroundColor: "rgba(50, 126, 213, 0.5)",
        borderColor: "#327ED5",
        borderWidth: 1,
        barThickness: 30,
      },
      {
        label: "Tratos",
        data: data2.map((item) => item["Importe"]),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar options={options} data={dataChart} />
    </div>
  );
};

export default LineChart;
