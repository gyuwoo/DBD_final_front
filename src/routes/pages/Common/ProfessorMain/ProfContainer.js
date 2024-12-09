import React, { useState, useEffect } from "react";
import ProfPresenter from "./ProfPresenter";

const ProfContainer = () => {
    const [rawData, setRawData] = useState(null);
    const [guideRawData, setGuideRawData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // 가상 데이터 로드
        const fetchData = () => {
            setRawData({
                categories: ["리더십", "유연성", "독창성", "자기개발", "멘토링", "협동"],
                currentSemester: [80, 60, 70, 88, 76, 50], // 현재 학기 값
                differences: [18, 12, 15, 21, 16, 20], // 현재 학기와 직전 학기 간의 차이
            });

            setGuideRawData({
                categories: ["리더십", "유연성", "독창성", "자기개발", "멘토링", "협동"],
                currentSemester: [62, 48, 55, 67, 60, 30],
                differences: [10, 8, 12, 10, 15, 10],
            });

            setPieData({
                labels: ["미션 수락", "미션 보류", "미션 거절"],
                datasets: [
                    {
                        data: [60, 28, 12],
                        backgroundColor: ["#61CDBB", "#F1E15B", "#F47560"],
                    },
                ],
            });

            setTableData([
                { grade: 3, studentId: "20201998", name: "류은중", deferDate: "2024.09.12", targetScore: 60, level: "높음" },
                { grade: 3, studentId: "20201546", name: "경병규", deferDate: "2024.09.10", targetScore: 45, level: "높음" },
                { grade: 2, studentId: "20221189", name: "유채림", deferDate: "2024.09.08", targetScore: 60, level: "낮음" },
                { grade: 2, studentId: "20221234", name: "김원목", deferDate: "2024.09.07", targetScore: 50, level: "낮음" },
            ]);
        };

        fetchData();
    }, []);

    // 데이터를 모두 로드했는지 확인
    if (!rawData || !pieData || tableData.length === 0) {
        return <div>Loading...</div>; // 로딩 상태 처리
    }

    return (
        <ProfPresenter
            rawData={rawData}
            guideRawData={guideRawData}
            pieData={pieData}
            tableData={tableData}
        />
    );
};

export default ProfContainer;
