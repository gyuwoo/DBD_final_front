import React, { useEffect, useState } from "react";
import "./Scholarship.css";

export const Scholarship = () => {
    const [selectedOption, setSelectedOption] = useState("seedPoint");
    const [seedList, setSeedList] = useState([]);
    const [currentSeed, setCurrentSeed] = useState(0);

    useEffect(() => {
        if (selectedOption === "seedPoint") {
            const getSeed = async () => {
                try {
                    const response = await fetch("http://localhost:4000/seedList", {
                        method: "GET",
                        credentials: "include",
                    });
                    const seedData = await response.json();
                    setSeedList(seedData.seedList || []);
                    setCurrentSeed(seedData.selStdSeed?.[0]?.seed || 0);
                } catch (error) {
                    console.log("Error fetching seed data:", error);
                }
            };
            getSeed();
        }
    }, [selectedOption]);

    const renderSeedPointContent = () => (
        <div className="semester-section">
            <div className="seed-header">
                <h3 className="history-title">
                    <svg
                        className="square"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 2C1 1.73478 1.48043 1.10536 2 1H14C14.2652 1 14.5196 1.10536 14.7071 1.29289C14.8946 1.48043 15 1.73478 15 2V14C15 14.2652 14.8946 14.5196 14.7071 14.7071C14.5196 14.8946 14.2652 15 14 15H2C1.73478 15 1.48043 14.8946 1.29289 14.7071C1.10536 14.5196 1 14.2652 1 14V2Z"
                            fill="#F8312F"
                        />
                    </svg>
                    씨앗포인트 획득 내역
                </h3>
                <h3>
                    현재 씨앗포인트 : <strong className="seed-strong">{currentSeed}포인트</strong>
                </h3>
            </div>

            <table className="history-table">
                <thead>
                    <tr>
                        <th>프로그램명</th>
                        <th>씨앗포인트 지급 내역</th>
                        <th>지급 구분</th>
                        <th>지급 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {seedList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.program_name}</td>
                            <td>{item.get_point > 0 ? `+${item.get_point}` : item.get_point}</td>
                            <td>{item.divison}</td>
                            <td>{item.get_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderLearningPointContent = () => (
        <div className="learning-point-section">
            <h3>학습포인트 내용</h3>
            <p>학습포인트 관련 정보가 여기에 표시됩니다.</p>
        </div>
    );

    const renderScholarshipContent = () => (
        <div className="scholarship-section">
            <h3>장학금 내용</h3>
            <p>장학금 관련 정보가 여기에 표시됩니다.</p>
        </div>
    );

    return (
        <div className="scholarship-container">
            <div className="dropdown-container">
                <select
                    id="scholarship-dropdown"
                    className="dropdown"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="seedPoint">씨앗포인트</option>
                    <option value="learningPoint">학습포인트</option>
                    <option value="scholarship">장학금</option>
                </select>
            </div>

            <div className="content-section">
                {selectedOption === "seedPoint" && renderSeedPointContent()}
                {selectedOption === "learningPoint" && renderLearningPointContent()}
                {selectedOption === "scholarship" && renderScholarshipContent()}
            </div>
        </div>
    );
};
