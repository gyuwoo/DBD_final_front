import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend,
} from 'chart.js';

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = () => {
    const data = {
        labels: ["김민지", "이혜인", "김민정", "김동영", "유희승"], // X축 라벨
        datasets: [
            {
                label: "기존 역량",
                data: [20, 35, 40, 55, 45],
                backgroundColor: "#E8A838", 
            },
            {
                label: "향상 수치",
                data: [75, 65, 65, 55, 50],
                backgroundColor: "#97E3D5",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: "bottom", // 범례 위치
        },
        title: {
            display: true,
            text: "전체 역량 성장폭이 큰 상위 5명 (2024년 2학기)",
            datalabels: {
                color: "#fff", // 데이터 라벨 색상 (막대 안의 글자)
                font: {
                    size: 12,
                    weight: "bold",
                },
                anchor: "center",
                align: "center",
              }, // 그래프 제목
        },
        },
        scales: {
        x: {
            stacked: true, // X축 누적 설정
            title: {
            display: true,
            text: "", // X축 제목
            },
        },
        y: {
            stacked: true, // Y축 누적 설정
            title: {
            display: true,
            text: "역량 수치", // Y축 제목
            },
            beginAtZero: true,
        },
        },
    };

    return <Bar data={data} options={options} width={400} height={300}/>;
};

export default BarChart;