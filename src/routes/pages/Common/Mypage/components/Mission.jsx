import React, { useState } from "react";
import "./Mission.css";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Mission = ({ missionData }) => {
    const { stdCompe, pastMission } = missionData;

    const [isPopupVisible, setPopupVisible] = useState(false);

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const chartData = {
        labels: stdCompe.map((compe) => compe.compe_name),
        datasets: [
            {
                label: "핵심 역량 점수",
                data: stdCompe.map((compe) => compe.compe_figure),
                backgroundColor: "#CCEBC5",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },

        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="mission-container">
            <div className="mission-header">
                <div>
                    <span>미션 현황 : </span>
                </div>
                <div>
                    <span>수락 마감 일자 : { }</span>
                </div>
                <div className="mission-btn">
                    <span>미션 상태</span>
                    <button className="ok-btn">수락</button>
                    <button
                        className="hold-btn"
                        onClick={openPopup}
                    >
                        보류
                    </button>
                    <button className="no-btn">거절</button>
                </div>
            </div>
            <div className="chart-section">
                <div className="chart-container">
                    <Bar data={chartData} options={chartOptions} />
                </div>

                <table className="info-table">
                    <thead>
                        <tr>
                            <th>핵심 역량</th>
                            <th>역량 점수</th>
                            <th>프로그램 수</th>
                            <th>진척도</th>
                            <th>진행 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stdCompe.map((compe, index) => (
                            <tr key={index}>
                                <td>{compe.compe_name}</td>
                                <td>10</td>
                                <td>0</td>
                                <td>0 / 10</td>
                                <td>대기</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 이전 미션 목록 */}
            <div className="mission-history-section">
                <h3 className="section-title">이전 미션 목록</h3>
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>시행 학기</th>
                            <th>역량 점수</th>
                            <th>씨앗 포인트</th>
                            <th>수락 날짜</th>
                            <th>종료 날짜</th>
                            <th>수락 여부</th>
                            <th>진행 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastMission.map((mission, index) => (
                            <tr key={index}>
                                <td>{mission.term}</td>
                                <td>{mission.seed}</td>
                                <td>{mission.seed}</td>
                                <td>{mission.final_accept}</td>
                                <td>{mission.final_date}</td>
                                <td>{mission.accept}</td>
                                <td>{mission.mis_state}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 팝업창 */}
            {isPopupVisible && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="popup-header">
                            <button className="close-btn" onClick={closePopup}>&times;</button>
                            <h3>보류 신청서</h3>
                        </div>
                        <p className="description">변경을 원하는 역량의 <span className="highlight">희망 수치</span>(5점 단위)를 적어주세요.</p>
                        <form>
                            {stdCompe.map((compe, index) => (
                                <div key={index} className="form-row">
                                    <div className="form-group">
                                        <label className="label">역량명: {compe.compe_name}</label>
                                    </div>
                                    <div className="form-group">
                                        <span className="fixed-value">부여 수치: 10</span>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <label className="input-label">희망 수치:</label>
                                            <input type="number" defaultValue={10} max={60} min={0} className="input-field" /> 점
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </form>
                        <div className="popup-footer">
                            <span className="total-score">역량 수치 총 합: <b>60점</b></span>
                            <p className="footer-note">* 총 수치는 60점이 넘지 않아야합니다</p>
                            <button className="submit-btn">보류 신청</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
