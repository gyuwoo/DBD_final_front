import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainPresenter from "./MainPresenter";
import axios from "axios";
import Topcit from '../../../../assets/topcit.png';
import DLearning from '../../../../assets/dlearning.jpg';

const MainContainer = () => {
    // 페이지 이동을 위한 외부 함수
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [studentInfo, setStudentInfo] = useState({
        id: '',
        pw: '',
    });

    const [programs, setPrograms] = useState([
        {       
            id: 1,
            poster: Topcit,
            state: '마감임박',
            program_name: '2024-2학기 TOPCIT 평가 지원 프로그램',
            progress_start: '24/10/12(토)',
            progress_final: '24/10/12(토)',
            apli_start: '24/09/02(월)',
            apli_final: '24/09/18(수)',
            compe_name: '유연성',
            compe_figure: '5',
            appi_people: 126,
            rec_people: 500,
        },
        {   
            id: 2,
            poster: DLearning,
            state: '마감임박',
            program_name: '2024-2학기 디러닝쿱(D-Learning Co-op)',
            progress_start: '24/10/16(수)',
            progress_final: '24/12/16(월)',
            apli_start: '24/09/02(월)',
            apli_final: '24/09/18(수)',
            compe_name: '유연성',
            compe_figure: '10',
            appi_people: 2,
            rec_people: 20,
        },
        {   
            id: 3,
            poster: Topcit,
            state: '모집중',
            program_name: '2024-2학기 TOPCIT 평가 지원 프로그램',
            progress_start: '24/10/12(토)',
            progress_final: '24/10/12(토)',
            apli_start: '24/09/02(월)',
            apli_final: '24/09/18(수)',
            compe_name: '유연성',
            compe_figure: '5',
            appi_people: 126,
            rec_people: 400,
        },
        {   
            id: 4,
            poster: DLearning,
            state: '모집중',
            program_name: '2024-2학기 디러닝쿱(D-Learning Co-op)',
            progress_start: '24/10/16(수)',
            progress_final: '24/12/16(월)',
            apli_start: '24/09/02(월)',
            apli_final: '24/09/18(수)',
            compe_name: '독창성',
            compe_figure: '10',
            appi_people: 2,
            rec_people: 200,
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

    const StudentLogin = async () => {
        try {
            axios
            .post("http://localhost:4000/login", { info: studentInfo })
            .then((res) => {
                console.log(res.data);
                // window.location.replace("/");
                if (res.data.type === "std"){
                    console.log("학생 메인으로 이동")
                }
            });

        } catch {
            console.error();
        }
    }

    // useEffect(() => {
    //     (
    //         async () => {
    //             console.log('test')
    //             try {
    //                 const result = await fetch('http://localhost:3333/user/session', {
    //                     method: 'post',
    //                     credentials: 'include',
    //                 });

    //                 if (!result) {
    //                     throw new Error(`server error`);
    //                 }

    //                 const data = await result.json();

    //                 if (data.status === 404) {
    //                     throw new Error(`no has user in session`);
    //                 }

    //                 setUser(data.data);
    //             } catch (e) {
    //                 console.error(e.message);
    //             }
    //         }
    //     )()
    // }, []);

    return (
        <MainPresenter
            navigate={navigate}

            programs={programs}

            StudentLogin={StudentLogin}
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}

            user={user}
            signOut={signOut}
        />
    )
}

export default MainContainer;