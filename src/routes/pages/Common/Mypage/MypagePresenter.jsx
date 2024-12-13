import React from "react";
import './Mypage.css'
import Layout from "../../../../components/Layout/Layout";
import { MyHeader } from "./components/MyHeader";
import { Mission } from "./components/Mission";
import { TabBar } from "./components/Tabbar";

const MypagePresenter = ({
    missionData,
}) => {
    if (!missionData || Object.keys(missionData).length === 0) {
        return <div>Loading...</div>; // 로딩 상태 표시
    }

    return (
        <Layout>
            <MyHeader missionData={missionData}/>
            {/* <Mission missionData={missionData}/> */}
            <TabBar missionData={missionData}/>
        </Layout>
    )
}

export default MypagePresenter;