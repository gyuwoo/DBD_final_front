import React from "react";
import './MyHeader.css'

export const MyHeader = ({missionData}) => {

    const {stdInfo, stdCompe, pastMission, mission, missionCompe} = missionData;

    return (
        <div className="myheader-container">
            <div className="my-title">
                <h1>마이페이지</h1>
            </div>
            <div className="my-info">
                <div className="my-info-h3">
                    <h3>학번</h3>
                </div>
                <span>{stdInfo[0].std_id}</span>
            </div>
            <div className="my-info">
                <div className="my-info-h3">
                    <h3>학년</h3>
                </div>
                <span>{stdInfo[0].grade}</span>
            </div>
            <div className="my-info">
                <div className="my-info-h3">
                    <h3>성명</h3>
                </div>
                <span>{stdInfo[0].name}</span>
            </div>
            <div className="my-info">
                <div className="my-info-h3">
                    <h3>휴대폰</h3>
                </div>
                <span>{stdInfo[0].tel}</span>
            </div>
            <div className="my-info">
                <div className="my-info-h3">
                    <h3>이메일</h3>
                </div>
                <span>{stdInfo[0].email}</span>
            </div>
            <div className="my-info">
                <div className="my-info-h3">
                    <h3>지도교수</h3>
                </div>
                <span>이수만</span>
            </div>
        </div>
    )
}