import React, { useState } from "react";
import './Tabbar.css';
import { Mission } from "./Mission";
import { Scholarship } from "./Scholarship";

const Participation = () => {
    return (
        <div>
            <h2>참여 프로그램</h2>
            <p>여기에 참여 프로그램 관련 내용이 표시됩니다.</p>
        </div>
    );
};

export const TabBar = ({ missionData }) => {
    const [selectedTab, setSelectedTab] = useState("mission");

    const tabContent = {
        mission: <Mission missionData={missionData} />,
        scholarship: <Scholarship />,
        participation: <Participation />,
    };

    return (
        <div>
            <div className="tab-bar">
                <button
                    className={`tab-button ${selectedTab === "participation" ? "active-tab" : ""}`}
                    onClick={() => setSelectedTab("participation")}
                >
                    참여 프로그램
                </button>
                <button
                    className={`tab-button ${selectedTab === "scholarship" ? "active-tab" : ""}`}
                    onClick={() => setSelectedTab("scholarship")}
                >
                    장학금
                </button>
                <button
                    className={`tab-button ${selectedTab === "mission" ? "active-tab" : ""}`}
                    onClick={() => setSelectedTab("mission")}
                >
                    미션
                </button>
            </div>
            <div className="tab-content">{tabContent[selectedTab]}</div>
        </div>
    );
};
