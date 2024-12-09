import React from "react";
import "./ProfHeader.css";
import logoImage from '../../assets/head_prof.png';

const ProfHeader = () => {
    return (
        <header className="prof-header">
            <div className="header-content">
                <img
                    src={logoImage}
                    alt="Dongseo University Logo"
                    className="header-logo"
                />
                <span className="header-title">동서대학교 비교과통합관리시스템</span>
                <div className="header-right">
                    <span>OOO님 환영합니다</span>
                    <a href="/logout" className="header-logout">로그아웃</a>
                </div>
            </div>
        </header>
    );
};

export default ProfHeader;
