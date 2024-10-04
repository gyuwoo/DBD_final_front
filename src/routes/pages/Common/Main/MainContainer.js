import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainPresenter from "./MainPresenter";

import Topcit from '../../../../assets/topcit.png';
import DLearning from '../../../../assets/dlearning.jpg';

const MainContainer = () => {
    // 페이지 이동을 위한 외부 함수
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
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

    const signOut = async () => {
        const ok = window.confirm('정말 로그아웃 하시겠습니까?');
        if (!ok) return;

        const result = await fetch('http://localhost:3333/user/signout', {
            method: 'post',
            credentials: 'include',
        });

        window.location.reload();
    }

    useEffect(() => {
        (
            async () => {
                console.log('test')
                try {
                    const result = await fetch('http://localhost:3333/user/session', {
                        method: 'post',
                        credentials: 'include',
                    });

                    if (!result) {
                        throw new Error(`server error`);
                    }

                    const data = await result.json();

                    if (data.status === 404) {
                        throw new Error(`no has user in session`);
                    }

                    setUser(data.data);
                } catch (e) {
                    console.error(e.message);
                }
            }
        )()
    }, []);

    return (
        <MainPresenter
            navigate={navigate}

            programs={programs}

            user={user}
            signOut={signOut}
        />
    )
}

export default MainContainer;