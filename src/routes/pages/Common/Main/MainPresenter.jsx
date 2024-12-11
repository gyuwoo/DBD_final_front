import React from 'react';
import Layout from "../../../../components/Layout/Layout";
import { ProgramList } from './components/Program';
import { ShowSpot } from './components/ShowSpot';
import SearchBar from './components/SearchBar';
import './Main.css';

const MainPresenter = ({
    StudentLogin,
    studentInfo,
    setStudentInfo,
    Logout,

    mainData
}) => {

    const { misAcc, misClear, seedRank, compeUp, programList } = mainData;

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
                        misAcc={misAcc}
                        misClear={misClear}
                        seedRank={seedRank}
                        compeUp={compeUp}
                    />
                </div>

                <div className="search-section">
                    <SearchBar />
                </div>

                {/* 전체 프로그램 */}
                <div className="program-section">
                    <h2>전체 프로그램</h2>
                    <div className="program-list">
                        <ProgramList
                            programList={programList}
                        />
                    </div>
                </div>


            </div>
        </Layout>
    );
};

export default MainPresenter;