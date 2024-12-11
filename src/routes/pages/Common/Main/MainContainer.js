import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainPresenter from "./MainPresenter";
import axios from "axios";
import Topcit from '../../../../assets/topcit.png';
import DLearning from '../../../../assets/dlearning.jpg';

const MainContainer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 페이지 이동을 위한 외부 함수
    const navigate = useNavigate();

    const [studentInfo, setStudentInfo] = useState({
        id: '',
        pw: '',
    });

    const [profInfo, setProfInfo] = useState({
        id: '',
        pw: '',
    })


    // const Logout = async () => {
    //     const ok = window.confirm('정말 로그아웃 하시겠습니까?');
    //     if (!ok) return;

    //     const result = await fetch('http://localhost:4000/logout', {
    //         method: 'post',
    //         credentials: 'include',
    //     });

    //     window.location.reload();
    // }

    const StudentLogin = async () => {
        try {
            axios
            .post("http://localhost:4000/login", { info: studentInfo }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                if (res.data.type === "std"){
                    setIsLoggedIn(true)
                    setStudentInfo(res.data);
                    console.log(studentInfo);
                    navigate('/std')
                    // window.location.replace("/");
                } else if (res.data.type === "prof"){
                    setIsLoggedIn(true)
                    setProfInfo(res.data);
                    navigate('/prof', { state: res.data });
                } else {
                    console.error("로그인 오류")
                    alert("로그인 오류");
                }
            });
        } catch (error){
            console.error(error);
        }
    }


    const [ mainData, setMainData] = useState({
        misAcc: [],
        misClear: [],
        seedRank: [],
        programList: [],
        compeUp: [],
    })

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/");
            setMainData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching main page data:", error);
        }
        };
    
        fetchData();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
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

            StudentLogin={StudentLogin}
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}


            mainData={mainData}
        />
    )
}

export default MainContainer;