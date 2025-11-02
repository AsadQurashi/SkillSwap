"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UserAnalyticsChart({ data })
{
    const chartData = {
        labels: data?.labels || [],
        datasets: [
            {
                label: "New Users",
                data: data?.new_users || [],
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Active Users",
                data: data?.active_users || [],
                borderColor: "rgb(16, 185, 129)",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
    return <Line data={chartData} options={options} />
}