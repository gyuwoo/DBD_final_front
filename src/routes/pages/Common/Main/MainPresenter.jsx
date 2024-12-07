import React from 'react';
import Layout from "../../../../components/Layout/Layout";
import { ProgramList } from './components/Program';
import { ShowSpot } from './components/ShowSpot';
import SearchBar from './components/SearchBar';
import './Main.css';

const MainPresenter = ({
    programs,
    StudentLogin,
    studentInfo,
    setStudentInfo,

}) => {

    return (
        <Layout
        
        >
        <div className="main-container">

                {/* 로그인 및 통계 섹션 */}
                <div className="login-box">
                    <ShowSpot
                        StudentLogin={StudentLogin}
                        studentInfo={studentInfo}
                        setStudentInfo={setStudentInfo}
                    />
                </div>

                <div className="search-section">
                    <SearchBar />
                </div>

                {/* 추천 프로그램 */}
                <div className="program-section">
                    <h2>추천 프로그램</h2>
                    <div className="program-list">
                        <ProgramList
                            programs={programs}
                        />
                    </div>
                </div>

                {/* 전체 프로그램 */}
                <div className="program-section">
                    <h2>전체 프로그램</h2>
                    <div className="program-list">
                        <ProgramList
                            programs={programs}
                        />
                    </div>
                </div>


            </div>
        </Layout>
    );
};

export default MainPresenter;