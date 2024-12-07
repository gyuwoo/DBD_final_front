import React from "react"
import './ShowSpot.css';
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import Seed from "../../../../../assets/seed.png"


const categories = [
    "리더십",
    "유연성",
    "독창성",
    "멘토링",
    "협동",
    "자기개발",
];



export const ShowSpot = ({
    StudentLogin,
    studentInfo,
    setStudentInfo,
}) => {

    const data1 = {
        labels: ['이수', '미이수'],
        datasets: [
        {
            data: [78, 22], // 참여율 데이터
            backgroundColor: ['#61CDBB', '#F47560'], // 색상
            hoverBackgroundColor: ['#61CDBB', '#F47560'], // 호버 색상
        },
        ],
    };

    const data2 = {
        labels: ['미션 수락율', '미션 보류', '미션 거절율'],
        datasets: [
        {
            data: [60, 28, 12], // 참여율 데이터
            backgroundColor: ['#61CDBB', '#F1E15B','#F47560'], // 색상
            hoverBackgroundColor: ['#61CDBB', '#F1E15B','#F47560'], // 호버 색상
        },
        ],
    };


    return (
        // 메인 화면 로그인이랑 미션 진척도 보여주는 부분
        <div className="show-spot">
            <div className="spot-container">
                <div className="spot-22">
                    <div className="banner">
                        <span>미션이 부여되는 주간입니다. 로그인하여 상태를 확인해주세요!!</span>
                    </div>
                    <div className="charts-container">

                        {/* 첫 번째 줄 */}
                        <div className="chart-box">
                            <PieChart 
                                data={data1}
                                title="미션 이수율 (2024년 1학기)"
                            />
                        </div>
                        <div className="chart-box">
                            <PieChart 
                                data={data2}
                                title="현재 미션 수락율 (2024년 2학기)"
                            />
                        </div>

                        {/* 두 번째 줄 */}
                        <div className="chart-box" style={styles.seed}>
                            <div className="seed-table">
                                <h3>
                                    <img src={Seed} alt="" />
                                    씨앗포인트 Rank (2024년 1학기)
                                </h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>순위</th>
                                        <th>이름</th>
                                        <th>씨앗포인트</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr><td>1</td><td>류윤종</td><td>102</td></tr>
                                    <tr><td>2</td><td>유채림</td><td>101</td></tr>
                                    <tr><td>3</td><td>경병규</td><td>97</td></tr>
                                    <tr><td>4</td><td>김원묵</td><td>95</td></tr>
                                    <tr><td>5</td><td>정민우</td><td>92</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="chart-box">
                        <h3>전체 역량 성장폭이 큰 상위 5명 (2024년 2학기)</h3>
                        <BarChart className="chart-barchart"/>
                        </div>
                    </div>
                </div>
                <div className="spot-2">

                    {/* 로그인 입력 box*/}
                    <div className="spot-login">
                        <div className="spot-login-span">
                            <span>동서대학교 학생지원시스템의</span>
                            <span> <strong className="strong">'아이디, 비밀번호'</strong>로 로그인 가능합니다.</span>
                        </div>
                        <div className="spot-login-input">
                            <input
                                type="text"
                                placeholder="아이디"
                                value={studentInfo.id}
                                onChange={(e) => {
                                    setStudentInfo(prev => {
                                        const id = e.target.value;
                                        return { ...prev, id };
                                    })
                                }}
                            />
                            <input
                                type="text"
                                placeholder="비밀번호"
                                value={studentInfo.pw}
                                onChange={(e) => {
                                    setStudentInfo(prev => {
                                        const pw = e.target.value;
                                        return { ...prev, pw };
                                    })
                                }}
                            />
                            <button className="login-button" onClick={StudentLogin}>로그인(Login)</button>
                        </div>
                    </div>

                    {/* 미션 진척도 확인 box */}
                    <div className="spot-mission-wrapper">
                        <div className="spot-mission-blur"></div>
                        <div className="mission-content">
                            <span className="blur-span">로그인 후 이용바랍니다</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H14C14.2652 1 14.5196 1.10536 14.7071 1.29289C14.8946 1.48043 15 1.73478 15 2V14C15 14.2652 14.8946 14.5196 14.7071 14.7071C14.5196 14.8946 14.2652 15 14 15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V2Z" fill="#F8312F"/>
                            </svg><span className="svg-span">진행중인 미션 목록 및 진척도</span>
                        </div>
                        <div className="mission-msg">
                            <span className="mission-msg-span">응원메시지 span 입니다</span>
                        </div>

                        {/* 카테고리와 막대 그래프 */}
                        {categories.map((category, index) => (
                            <div className="mission-progress" key={index} style={styles.row}>
                                <span style={styles.category}>{category}</span>
                                <div style={styles.barContainer}>
                                    <div style={styles.bar}></div>
                                </div>
                                <span>0</span>
                            </div>
                        ))}
                    </div>




                </div>
            </div>
        </div>
    )
}

const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
    },
    category: {
        flexBasis: "100px",
        textAlign: "left",
    },
    barContainer: {
        flexGrow: 1,
        height: "10px",
        backgroundColor: "#e0e0e0",
        borderRadius: "5px",
        marginLeft: "8px",
        marginRight: "8px",
    },
    bar: {
        width: "0%",
        height: "100%",
        backgroundColor: "#b0b0b0",
        borderRadius: "5px",
    },
    value: {
        flexBasis: "30px",
        textAlign: "right",
    },
    seed: {
        backgroundColor: "#FFFDF5"
    }
};