import React from "react";
import Layout from "../../../../components/Layout/Layout";
import SearchBar from "../Main/components/SearchBar";
import './Std.css';
import { StdShowSpot } from "./components/StdShowSpot";
import { ProgramList } from "../Main/components/Program";
import { StdProgram } from "./components/StdProgram";
import MypagePresenter from "../Mypage/MypagePresenter";


export const StdPresenter = ({ studentData }) => {

    const { recommendProgram, programList } = studentData

    

    return (
        <Layout>
            <div>
                {/* 로그인 및 통계 섹션 */}
                <div className="login-box">
                    <StdShowSpot studentData={studentData} />
                </div>

                {/* 검색 섹션 */}
                <div className="std-search-section">
                    <SearchBar />
                </div>

                <div className="program-section">
                    <h2>추천 프로그램</h2>
                    <StdProgram recommendProgram={recommendProgram}/>
                </div>
                <div className="program-section">
                    <h2>전체 프로그램</h2>
                    <ProgramList programList={programList}/>
                </div>
            </div>
        </Layout>
    );
};