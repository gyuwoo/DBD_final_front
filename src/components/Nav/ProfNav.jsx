import React from "react";
import "./ProfNav.css";
import myPageIcon from "../../assets/prof_mypage_icon.png";
import studentIcon from "../../assets/student_prof.png";

const ProfNav = () => {
    return (
        <nav className="prof-nav">
            <h2 className="nav-title">관리 메뉴</h2>
            <ul className="nav-list">
                <li className="nav-item">
                    <img src={myPageIcon} alt="마이페이지" className="nav-icon" />
                    <span className="nav-text">마이페이지</span>
                </li>
                <li className="nav-item">
                    <img src={studentIcon} alt="지도 학생" className="nav-icon" />
                    <span className="nav-text">지도 학생</span>
                </li>
            </ul>
        </nav>
    );
};

export default ProfNav;
