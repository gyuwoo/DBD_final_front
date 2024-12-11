import React, { useState } from "react";
import logoImage from '../../assets/h1_logo.png';
import userImage from '../../assets/user.png';
import axios from "axios";
import signoutImage from '../../assets/signout.png';
import './Header.css';
import StudentSignIn from "../SIgnIn/Student/StudentSignIn";

const Header = ({
    user,
    signOut,
}) => {
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
        <header>
            <div className="logout-div">
                <button className="logout-btn" onClick={Logout}>로그아웃</button>
            </div>
            
        </header>
    )
}

export default Header;