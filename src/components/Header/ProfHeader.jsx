import React from "react";
import "./ProfHeader.css";
import logoImage from '../../assets/head_prof.png';
import axios from "axios";

const ProfHeader = () => {
    const Logout = async () => {
        try {
            const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
            if (!confirmLogout) return;

            // 로그아웃 요청
            await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
            window.location.replace("/");
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

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
                    <a href="/" className="header-logout" onClick={Logout}>로그아웃</a>
                </div>
            </div>
        </header>
    );
};

export default ProfHeader;
