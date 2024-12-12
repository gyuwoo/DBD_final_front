import React, { useEffect, useState } from "react";
import axios from "axios";
import MypagePresenter from "./MypagePresenter";

const MypageContainer = () => {
    const [missionData, setMissionData] = useState(null);

    useEffect(() => {
        const getMissionData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/mission", { withCredentials: true });
                setMissionData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("미션 데이터 없음");
            }
        };

        getMissionData();
    }, []);

    return <MypagePresenter missionData={missionData} />;
};


export default MypageContainer;