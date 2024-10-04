import React, { useState } from "react";
import './StudentSignIn.css';
import logoImage from '../../../assets/h1_logo.png';
import { useNavigate } from "react-router-dom";

const StudentSignIn = ({
    setIsShowStudentLogin,
}) => {
    const navigate = useNavigate();
    const [studentInfo, setStudentInfo] = useState({
        id: '',
        pw: '',
    });

    const StudentLogin = async () => {
        try {
            const result = await fetch('http://localhost:3333/user/signin', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    Accept: 'application/json',
                },
                body: JSON.stringify(studentInfo),
                credentials: "include",
            })

            if (!result) {
                throw new Error(`signin error`);
            }
            console.log(result)

            const data = await result.json();

            console.log(data);
            if (data.status === 500) {
                alert(data.message);
                return;
            }

            // 성공 시
            setStudentInfo({
                id: '',
                pw: '',
            });
            // setIsShowStudentLogin(false);
            // navigate('/');
            window.location.reload();
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="student-signin-container">
            <div className="student-signin-bg"></div>
            <div className="student-signin-wrap">
                <div
                    className="close-button"
                    onClick={() => setIsShowStudentLogin(false)}
                >
                    X
                </div>
                <div className="student-signin-logo">
                    <img
                        src={logoImage}
                        alt="logo"
                        className=""
                    />
                </div>
                <div className="student-signin-form">
                    <div className="signin-input-form">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={studentInfo.id}
                            onChange={(e) => {
                                setStudentInfo(prev => {
                                    const id = e.target.value;
                                    return { ...prev, id };
                                })
                            }}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={studentInfo.pw}
                            onChange={(e) => {
                                setStudentInfo(prev => {
                                    const pw = e.target.value;
                                    return { ...prev, pw };
                                })
                            }}
                        />
                    </div>
                    <button
                        className="signin-button"
                        onClick={StudentLogin}
                    >
                        로그인
                    </button>
                </div>
                <div className="copyright">
                    Copyright © 2022 by Dongseo University. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default StudentSignIn;