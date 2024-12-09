import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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



const BarChart = ({ labels, dataset }) => {

    const data = {
        labels: labels,
        datasets: [
            {
            label: "기존 역량",
            data: dataset,
            backgroundColor: "#E8A838",
            },
        ],
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:4000/');
    //             const result = response.data;

    //             const labels = result.compeUp.map(item => item.name);
    //             const data = result.compeUp.map(item => item.average_compe_figure);

    //             setBarData({
    //                 labels: labels,
    //                 datasets: [
    //                     {
    //                         label: "역량 평균",
    //                         data: data,
    //                         backgroundColor: "#61CDBB",
    //                     },
    //                 ],
    //             });
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // const data = {
    //     labels: ["김민지", "이혜인", "김민정", "김동영", "유희승"], // X축 라벨
    //     datasets: [
    //         {
    //             label: "기존 역량",
    //             data: [20, 35, 40, 55, 45],
    //             backgroundColor: "#E8A838", 
    //         },
            
    //     ],
    // };

    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: "bottom", // 범례 위치
        },
        title: {
            display: true,
            
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