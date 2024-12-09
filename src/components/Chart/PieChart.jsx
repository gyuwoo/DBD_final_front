import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieChartComponent = ({ data, title }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
        },
    };

    return (
        <div className="pie-chart-container">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default PieChartComponent;