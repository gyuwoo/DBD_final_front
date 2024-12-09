import React from "react";
import { Bar } from "react-chartjs-2";
import ProfNav from "../../../../components/Nav/ProfNav";
import Footer from "../../../../components/Footer/Footer";
import ProfHeader from "../../../../components/Header/ProfHeader";
import "./Prof.css";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import PieChart from '../../../../components/Chart/PieChart';

const ProfPresenter = ({ rawData, guideRawData, pieData, tableData }) => {

    const processedData = {
        categories: rawData.categories,
        currentSemester: rawData.currentSemester,
        previousSemester: rawData.currentSemester.map(
            (current, index) => current - rawData.differences[index]
        ),
    };

    const guideProcessedData = {
        categories: guideRawData.categories,
        currentSemester: guideRawData.currentSemester,
        previousSemester: guideRawData.currentSemester.map(
            (current, index) => current - guideRawData.differences[index]
        ),
    };

    const generateBarData = (data, differences) => ({
        labels: data.categories,
        datasets: [
            {
                label: "직전 학기",
                data: data.previousSemester,
                backgroundColor: "#d9d9d9", // 회색
            },
            {
                label: "현재 학기 증가분",
                data: differences,
                backgroundColor: "#dc7375", // 핑크색
            },
        ],
    });

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // 범례 숨김
            },
            datalabels: {
                display: true,
                color: '#000',
                align: 'top',
                formatter: function (value, context) {
                    const datasetIndex = context.datasetIndex;
                    const dataIndex = context.dataIndex;

                    if (datasetIndex === 0) {
                        return value;
                    } else {
                        const previousValue = context.chart.data.datasets[0].data[dataIndex];
                        return previousValue + value;
                    }
                },
            },

            
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                max: 100, // Y축 최대값 설정
            },
        },
    };

    return (
        <div className="prof-main">
            <ProfHeader />
            <ProfNav />

            <div className="charts-layout">
                <div className="charts-left">
                    <div className="chart-block">
                        <h3>전체 학생 역량 성장 폭</h3>
                        <Bar data={generateBarData(processedData, rawData.differences)} options={barOptions} plugins={[ChartDataLabels]} />
                    </div>
                    <div className="chart-block">
                        <h3>지도 학생 역량 성장 폭</h3>
                        <Bar data={generateBarData(guideProcessedData, guideRawData.differences)} options={barOptions} plugins={[ChartDataLabels]} />
                    </div>
                </div>
                <div className="chart-right">
                    <h3>현재 미션 수락률 (2025년 1학기)</h3>
                    <PieChart data={pieData} title="현재 미션 수락률 (2025년 1학기)" />
                </div>
            </div>

            <div className="table-student">
                <h3>미션 보류 학생 목록</h3>
            </div>
            
            <Footer />
        </div>
    );
};

export default ProfPresenter;
