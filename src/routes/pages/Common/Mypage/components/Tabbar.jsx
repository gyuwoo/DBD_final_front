import React, {useState} from "react";
import './Tabbar.css'
import { Mission } from "./Mission";

const Scholarship = () => {
    return (
        <div>
            <h2>장학금</h2>
            {/* 장학금 관련 UI */}
            <p>여기에 장학금 관련 내용이 표시됩니다.</p>
        </div>
        );
    };

const Participation = () => {
    return (
        <div>
            <h2>참여 프로그램</h2>
            {/* 참여 프로그램 관련 UI */}
            <p>여기에 참여 프로그램 관련 내용이 표시됩니다.</p>
        </div>
    );
};

export const TabBar = ({missionData}) => {
    const [selectedTab, setSelectedTab] = useState("mission");

    const tabContent = {
        mission: <Mission missionData={missionData}/>,
        scholarship: <Scholarship />,
        participation: <Participation />,
    };

    return (
        <div>
        <div className="tab-bar">
            <button className="part-tab" onClick={() => setSelectedTab("participation")}>참여 프로그램</button>
            <button className="scho-tab" onClick={() => setSelectedTab("scholarship")}>장학금</button>
            <button className="mission-tab" onClick={() => setSelectedTab("mission")}>미션</button>
        </div>
        <div className="tab-content">{tabContent[selectedTab] || <Mission />}</div>
        </div>
    );
};
