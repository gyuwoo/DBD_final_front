import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainPresenter from "./MainPresenter";

import Topcit from '../../../../assets/topcit.png';
import DLearning from '../../../../assets/dlearning.jpg';

const MainContainer = () => {
    // 페이지 이동을 위한 외부 함수
    const navigate = useNavigate();
    const [programs, setPrograms] = useState([
        {
            img: Topcit,
            status: '모집중',
            title: '2024-2학기 TOPCIT 평가 지원 프로그램',
            operating_start_hours: '24/10/12(토)',
            operating_end_hours: '24/10/12(토)',
            application_period_start: '24/09/02(월)',
            application_period_end: '24/09/18(수)',
            manager_department: '컴퓨터공학과',
            manager_name: '김민준',
            manager_phone: '320-1749',
            current_accept: 126,
            max_accept: 0,
        },
        {
            img: DLearning,
            status: '모집중',
            title: '2024-2학기 디러닝쿱(D-Learning Co-op)',
            operating_start_hours: '24/10/16(수)',
            operating_end_hours: '24/12/16(월)',
            application_period_start: '24/09/02(월)',
            application_period_end: '24/09/18(수)',
            manager_department: '교수학습개발센터',
            manager_name: '정예빈',
            manager_phone: '320-4871',
            current_accept: 2,
            max_accept: 0,
        },
    ])

    // const buttonClick = async () => {
    //     const result = await fetch('http://localhost:3333/test', {
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             Accept: 'application/json',
    //             mode: 'no-cors',
    //             'Access-Control-Allow-Origin': '*',
    //         }
    //     });

    //     const data = await result.json();
    //     setText(data.data);
    // }

    // const SignUp = async () => {
    //     const result = await fetch('http://localhost:3333/user/signup', {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             Accept: 'application/json',
    //             mode: 'no-cors',
    //             'Access-Control-Allow-Origin': '*',
    //         }
    //     });

    //     const data = await result.json();
    //     console.log(data)
    //     setIsSignUp(data)
    // }

    // const SignIn = async () => {
    //     const result = await fetch('http://localhost:3333/user/signin', {
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             Accept: 'application/json',
    //             mode: 'no-cors',
    //             'Access-Control-Allow-Origin': '*',
    //         }
    //     });

    //     const data = await result.json();
    //     console.log(data)
    //     setIsSignIn(data)
    // }

    return (
        <MainPresenter
            navigate={navigate}

            programs={programs}
        />
    )
}

export default MainContainer;