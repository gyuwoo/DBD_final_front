import React, { useEffect, useState } from "react";
import axios from "axios";
import { StdPresenter } from "./StdPresenter";

const StdContainer = () => {
    const [studentData, setStudentData] = useState(null);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudentData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/stdmain", { withCredentials: true });
                setStudentData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("학생 데이터 로드 실패:", error);
                setLoading(false);
            }
        };

        getStudentData();
    }, []);

    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <StdPresenter studentData={studentData} />
    );
};

export default StdContainer;