import React, { useState } from "react";
import Layout from "../../../../components/Layout/Layout";
import Footer from "../../../../components/Footer/Footer";
import ApplicationModal from "./component/ApplicationModal";
import "./Detail.css";

const getProgramImage = (programId) => {
    try {
        return require(`../../../../assets/program/${programId}.png`)
    } catch (error) {
        return;
    }
};

const DetailPresenter = ({ program }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 프로그램 데이터가 없는 경우 처리
    if (!program || program.length === 0) {
        return (
            <div>
                <Layout>
                    <div className="error-container">
                        <h3>프로그램 정보를 찾을 수 없습니다.</h3>
                    </div>
                </Layout>
                <Footer />
            </div>
        );
    }

    const programData = program[0]; // JSON 데이터의 첫 번째 값 사용
    

    return (
        <div>
            <Layout>
                <div className="detail-container">
                    {/* 프로그램 제목 */}
                    <div className="program-header">
                        <h2 className="program-title">{programData.program_name}</h2>
                        <div className="program-tag-container">
                            <span className="program-tag">{programData.compe_name}</span>
                            <span
                                className={`program-status ${
                                    programData.state === "모집중" ? "status-active" : ""
                                }`}
                            >
                                {programData.state}
                            </span>
                        </div>
                    </div>

                    {/* 프로그램 상세 내용 */}
                    <div className="program-content">
                        {/* 이미지 */}
                        <div className="program-image">
                            <img
                                src={getProgramImage(programData.id)} // 경로 수정
                                alt={programData.program_name}
                                className="program-poster"
                            />
                        </div>

                        {/* 세부 정보 */}
                        <div className="program-details">
                            <table className="program-details-table">
                                <tbody>
                                    <tr>
                                        <th>개요</th>
                                        <td>{programData.program_name}</td>
                                    </tr>
                                    <tr>
                                        <th>신청일시</th>
                                        <td>
                                            {programData.apli_start} ~ {programData.apli_final}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>운영일시</th>
                                        <td>
                                            {programData.progress_start} ~ {programData.progress_final}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>모집인원</th>
                                        <td>{programData.rec_people}명</td>
                                    </tr>
                                    <tr>
                                        <th>신청인원</th>
                                        <td>{programData.appi_people}명</td>
                                    </tr>
                                    <tr>
                                        <th>학습포인트</th>
                                        <td>{programData.study}</td>
                                    </tr>
                                    <tr>
                                        <th>씨앗포인트</th>
                                        <td>{programData.seed}</td>
                                    </tr>
                                    <tr>
                                        <th>역량수치</th>
                                        <td>{programData.compe_figure}</td>
                                    </tr>
                                    <tr>
                                        <th>프로그램 담당자</th>
                                        <td>{programData.admin_name}</td>
                                    </tr>
                                    <tr>
                                        <th>부서</th>
                                        <td>{programData.admin_dep}</td>
                                    </tr>
                                    <tr>
                                        <th>연락처</th>
                                        <td>{programData.dep_tel}</td>
                                    </tr>
                                    <tr>
                                        <th>프로그램 구분</th>
                                        <td>{programData.program_div}</td>
                                    </tr>
                                    <tr>
                                        <th>보고서 횟수</th>
                                        <td>{programData.report}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 버튼 */}
                    <div className="button-group">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="apply-button"
                        >
                            프로그램 신청
                        </button>
                        <button
                            className="back-button"
                            onClick={() => window.history.back()}
                        >
                            목록으로
                        </button>
                    </div>
                </div>
            </Layout>

            {/* 프로그램 신청 모달 */}
            <ApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                programData={programData}
            />
        </div>
    );
};

export default DetailPresenter;
