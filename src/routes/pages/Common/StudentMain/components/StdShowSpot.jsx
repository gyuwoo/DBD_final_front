import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import './StdShowSpot.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const StdShowSpot = ({ studentData }) => {
    const { compeUp, mySeedRank, programStats, acceptMission, selAccept, recommendProgram, name } = studentData;


    // 데이터 필터링: compe_up > 0인 항목만 포함
    const filteredCompeUp = compeUp.filter((item) => item.compe_up > 0);
    const categories = ["리더십", "유연성", "독창성", "멘토링", "협동", "자기개발"];
    const terms = [...new Set(filteredCompeUp.map((item) => item.term))]; // 학기 목록
    
    
    const datasets = terms.map((term, index) => ({
        label: term,
        data: categories.map(
            (category) =>
                filteredCompeUp.find(
                    (item) => item.compe_name === category && item.term === term
                )?.compe_up || 0
        ),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"][
            index % 6
        ],
    }));

    
    const growthChartData = {
        labels: categories, // X축 레이블 (역량 이름)
        datasets: datasets, // 학기별 데이터셋
    };

    // Chart.js 옵션
    const growthChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // 그래프 크기 조정 가능
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "성장 그래프",
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true, 
                beginAtZero: true,
                max: 100, // 최대값 설정 (필요에 따라 조정 가능)
            },
        },
    };
    
    const navigate = useNavigate();


    
    const test =() => {
        console.log(studentData)
    }

    return (
        <div className="show-spot">
            <div className="std-spot-container">
                {/* 성장 그래프 */}
                <div className="growth-chart">
                    <h3><strong className="strong-state">{name[0].std_state} {name[0].name} </strong>님 성장 그래프</h3>
                    <div style={{ height: '400px', width:'730px' }}>
                        <Bar data={growthChartData} options={growthChartOptions} />
                    </div>
                </div>

                {/* 오른쪽 정보 박스 */}
                <div className="info-box-container">
                    {/* 누적 씨앗 포인트 랭킹 */}
                    <div className="info-box">
                        <h3>📌 누적 씨앗 포인트 랭킹</h3>
                        <p>누적: <strong className="info-strong">{mySeedRank[0]?.seed || 0}</strong>점</p>
                        <p>랭킹: <strong className="info-strong">{mySeedRank[0]?.rank || "N/A"}</strong>등 (상위 {mySeedRank[0]?.percent}%)</p>

                        <h3>📌 프로그램 현황(누적)</h3>
                        <p>신청/이수/미이수 : <strong>{programStats[0].appli || 0} / {programStats[0].isu || 0} / {programStats[0].miisu || 0}</strong></p>
                    </div>

                    {/* 현재 진행 중인 미션 */}
                    {selAccept?.[0]?.accept !== "수락" && (
                        <h3 className="centered-msg">현재 진행중인 미션이 없습니다.</h3>
                    )}
                    <div className={`info-box-2 ${selAccept?.[0]?.accept === "수락" ? "" : "info-box-blur" }`}>
                        <h3 onClick={()=> {navigate('/mypage')}}>📌 진행중 미션 목록 및 진척도</h3>
                        <p>"목표를 향해 열심히 달려보자!!"</p>
                        <div className="info-categoty">
                            <span>카테고리</span>
                            <span>현재</span>
                            <span>목표</span>
                        </div>
                        {acceptMission ? (
                            <>
                                {acceptMission.map((mission, index) => (
                                    <div key={index}  className="mission-progress-row" onClick={()=> {navigate('/mypage')}}>
                                        <div className="compe-name">
                                            <span>{mission.compe_name}</span>
                                        </div>
                                        {/* <div className="progress-bar-container">
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    width: `${mission.progress_figure || 0}%`,
                                                    backgroundColor: "#61CDBB",
                                                }}
                                            ></div>
                                            {mission.progress_figure || 0}
                                        </div> */}
                                        <div className="progress-figure">
                                            <span>{mission.progress_figure || 0}</span>
                                        </div>
                                        <div className="compe-figure">
                                            <span>{mission.compe_figure || 0}</span>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>        
                                <p className="centerd-msg">현재 진행중인 미션이 없습니다.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
