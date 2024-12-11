
import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // 플러그인 추가
import "./PieChart.css";

const PieChartComponent = ({ data, title }) => {
    // 데이터 필터링 및 백분율 계산
    const filterPieData = (data) => {
        const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

        const filteredLabels = data.labels.filter(
            (_, index) => data.datasets[0].data[index] !== 0
        );

        const filteredData = data.datasets[0].data.filter((value) => value !== 0);

        const filteredBackgroundColors = data.datasets[0].backgroundColor.filter(
            (_, index) => data.datasets[0].data[index] !== 0
        );

        const percentageData = filteredData.map(
            (value) => ((value / total) * 100).toFixed(1) // 백분율 계산
        );

        return {
            labels: filteredLabels,
            datasets: [
                {
                    data: filteredData,
                    backgroundColor: filteredBackgroundColors,
                },
            ],
            percentages: percentageData, // 백분율 데이터 추가
        };
    };

    const filteredData = filterPieData(data);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            datalabels: {
                color: "#000", // 데이터 레이블 색상
                font: {
                    size: 14, // 데이터 레이블 폰트 크기
                },
                formatter: (value, context) => {
                    const percentage = filteredData.percentages[context.dataIndex];
                    return `${percentage}%`; // 백분율로 표시
                },
            },
        },
    };

    return (
        <div className="pie-chart-container">
            <Doughnut
                data={{
                    labels: filteredData.labels,
                    datasets: filteredData.datasets,
                }}
                options={options}
                plugins={[ChartDataLabels]} // 플러그인 등록
            />
        </div>
    );
};

export default PieChartComponent;
