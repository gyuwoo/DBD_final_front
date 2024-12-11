import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import ProfNav from "../../../../components/Nav/ProfNav";
import Footer from "../../../../components/Footer/Footer";
import ProfHeader from "../../../../components/Header/ProfHeader";
import "./Prof.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
import PieChart from "../../../../components/Chart/PieChart";
import BarChart from "../../../../components/Chart/BarChart";

const ProfPresenter = ({
    professorName,
    rawData,
    guideRawData,
    pieData,
    tableData,
    expandedStudentId,
    toggleStudentDetails,
    onAdjustSubmit,
    studentBarChartData,
}) => {
    const [adjustedValues, setAdjustedValues] = useState({});

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
                color: "#000",
                formatter: function (value, context) {
                    const datasetIndex = context.datasetIndex;
                    const dataIndex = context.dataIndex;

                    if (datasetIndex === 0) {
                        return value;
                    } else {
                        const previousValue =
                            context.chart.data.datasets[0].data[dataIndex];
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

    const handleInputChange = (studentId, index, value) => {
        setAdjustedValues((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [index]: value,
            },
        }));
    };

    const handleAdjustSubmit = () => {
        if (expandedStudentId && adjustedValues[expandedStudentId]) {
            onAdjustSubmit(expandedStudentId, adjustedValues[expandedStudentId]); // 서버 전송
        }
    };

    return (
        <div className="prof-main">
            <ProfHeader professorName={professorName} />
            <ProfNav />

            <div className="charts-layout">
                <div className="charts-left">
                    <div className="chart-block">
                        <h3>전체 학생 역량 성장 폭</h3>
                        <Bar
                            data={generateBarData(processedData, rawData.differences)}
                            options={barOptions}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                    <div className="chart-block">
                        <h3>지도 학생 역량 성장 폭</h3>
                        <Bar
                            data={generateBarData(
                                guideProcessedData,
                                guideRawData.differences
                            )}
                            options={barOptions}
                            plugins={[ChartDataLabels]}
                        />
                    </div>
                </div>
                <div className="chart-right">
                <h3>{expandedStudentId ? "학생 역량 누적 그래프" : "현재 미션 수락률 (2025년 1학기)"}</h3>
                {expandedStudentId && studentBarChartData ? (
                    <BarChart
                        labels={studentBarChartData.stdCompe.map((item) => item.compe_name)}
                        currentData={studentBarChartData.stdCompe.map((item) => item.compe_figure)}
                        additionalData={studentBarChartData.stdCompeUp.map((item) => item.compe_up)}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: true } },
                            scales: {
                                x: { stacked: true },
                                y: { stacked: true, beginAtZero: true, max: 100 },
                            },
                        }}
                    />
                ) : (
                    <PieChart data={pieData} title="현재 미션 수락률 (2025년 1학기)" />
                )}
</div>

            </div>

            <div className="table-student">
                <h3>미션 보류 학생 목록</h3>
                <button className="batch-process">일괄 처리</button>
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>학년</th>
                            <th>학번</th>
                            <th>학생 이름</th>
                            <th>보류 날짜</th>
                            <th>희망 역량 수치</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.map((student, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    className={`student-row ${
                                        expandedStudentId === student.studentId
                                            ? "expanded"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        toggleStudentDetails(student.studentId)
                                    }
                                >
                                    <td>{student.grade}</td>
                                    <td>{student.studentId}</td>
                                    <td>{student.name}</td>
                                    <td>{student.deferDate || "-"}</td>
                                    <td>{student.targetScore || "-"}</td>
                                </tr>
                                {expandedStudentId === student.studentId && (
                                    <tr className="expanded-row">
                                        <td colSpan="5">
                                            <div className="student-details">
                                                <h4>보류 목록</h4>
                                                <table className="details-table">
                                                    <thead>
                                                        <tr>
                                                            <th>역량명</th>
                                                            <th>희망 수치</th>
                                                            <th>조정 수치</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {student.holdList.map(
                                                            (holdItem, idx) => (
                                                                <tr key={idx}>
                                                                    <td>{holdItem.compe_name || "-"}</td>
                                                                    <td>{holdItem.hold_figure || "0"}</td>
                                                                    <td>
                                                                        <input
                                                                            type="number"
                                                                            defaultValue={holdItem.compe_figure || 0}
                                                                            min={0}
                                                                            onChange={(e) =>
                                                                                handleInputChange(
                                                                                    student.studentId,
                                                                                    idx,
                                                                                    parseInt(
                                                                                        e.target.value,
                                                                                        10
                                                                                    )
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                                <button
                                                    className="adjust-button"
                                                    onClick={handleAdjustSubmit}
                                                >
                                                    조정하기
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>


            <Footer />
        </div>
    );
};

export default ProfPresenter;
