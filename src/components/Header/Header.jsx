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
    const [isShowStudentLogin, setIsShowStudentLogin] = useState(false);
    const ShowStudentLogin = () => {
        setIsShowStudentLogin(!isShowStudentLogin);
    }

    // const Logout = async () => {
    //     try {
    //         const ok = window.confirm('정말 로그아웃 하시겠습니까?');
    //         if (!ok) return;
    //         axios
    //         .post("http://localhost:4000/logout", {info: see})
    //         .then((res) => {
    //             console.log(res.data);
    //         });

    //     } catch {
    //         console.error();
    //     }
    // }

    return (
        <header>
            {/* <button onClick={Logout}>로그아웃</button> */}

            {/* <a className="logo">
                <img src={logoImage} alt="logo" />
            </a>
            {
                user ?
                    <ul className="student-info-list">
                        <li>
                            <div className="student-info">
                                <img src={userImage} alt="" />
                                <div className="student-name">{user?.name}</div>
                            </div>
                        </li>
                        <li>
                            <div className="signout-button" onClick={() => signOut()}>
                                <img src={signoutImage} alt="" />
                            </div>
                        </li>
                    </ul>
                    :
                    <ul className="signin-list">
                        <li>
                            <a
                                href="javascript:void(0)"
                                onClick={ShowStudentLogin}
                            >
                                Student Login
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                교수자로그인
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                운영자
                            </a>
                        </li>
                    </ul>
            }
            {
                isShowStudentLogin &&
                <StudentSignIn
                    setIsShowStudentLogin={setIsShowStudentLogin}
                />
            } */}
        </header>
    )
}

export default Header;