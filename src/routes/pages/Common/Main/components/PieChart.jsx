import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";

// 필요한 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({
    data, 
    title
}) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            datalabels: {
                color: "#000",
                font: {
                    size: 14,
                    weight: "bold",
                },
                formatter: (value, context) => `${value}%`,
            },
        },
        cutout: '50%', // 도넛 모양을 위한 옵션 (가운데 비우기)
    };

    return (
        <div>
            <h3>{title}</h3>
            <Pie data={data} options={options} />
        </div>
    )
};

export default PieChart;