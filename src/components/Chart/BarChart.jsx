import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ labels, currentData, additionalData, options }) => {

    const data = {
        labels: labels,
        datasets: [
            {
                label: "현재 수치",
                data: currentData,
                backgroundColor: "#61CDBB", // 현재 수치 색상
            },
            {
                label: "추가 수치",
                data: additionalData,
                backgroundColor: "#F47560", // 추가 수치 색상
            },
        ],
    };

    return (
        <div style={{ width: "90%", height: "80%" }}>
            <Bar
                data={data}
                options={{
                    ...options,
                    maintainAspectRatio: false, // Disable aspect ratio
                }}
            />
        </div>
    );
};

export default BarChart;
