"use client";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJs, 
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { data } from "autoprefixer";
 
ChartJs.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    BarElement,
    Filler,
    Title,
    Tooltip,
    Legend,
);

export default function ActivityChart({ data })
{
    const chartData = {
        labels: Object.keys(data || {}),
        datasets: [
            {
                label: "Activity",
                data: Object.values(data || {}),
                backgroundColor: "rgba(139, 92, 246, 0.7)",
                borderColor: "rgb(139, 92, 246)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                text : 'Platform Activity'
            },
        },
        scales: {
            y: {
                beginWithZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
                ticks:
                {
                    stepSize: 1,
                }
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };
    return <Bar data={chartData} options={options} />
}

