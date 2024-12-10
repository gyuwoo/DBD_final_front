import React, { useState, useEffect } from "react";
import ProfPresenter from "./ProfPresenter";

const ProfContainer = () => {
    const [rawData, setRawData] = useState(null);
    const [guideRawData, setGuideRawData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [expandedStudentId, setExpandedStudentId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // `localhost:4000/profmain`에서 전체 데이터 가져오기
                const mainResponse = await fetch("http://localhost:4000/profmain");
                const mainData = await mainResponse.json();

                // 전체 학생 역량 데이터 처리
                const totalCompeCategories = ["리더십", "유연성", "독창성", "자기개발", "멘토링", "협동"];
                const totalCompeValues = [
                    mainData.totalCompe[0].lead,
                    mainData.totalCompe[0].plia,
                    mainData.totalCompe[0].orig,
                    mainData.totalCompe[0].self,
                    mainData.totalCompe[0].mento,
                    mainData.totalCompe[0].colla,
                ];
                const totalCompeDifferences = [
                    mainData.totalCompeUp[0].lead,
                    mainData.totalCompeUp[0].plia,
                    mainData.totalCompeUp[0].orig,
                    mainData.totalCompeUp[0].self,
                    mainData.totalCompeUp[0].mento,
                    mainData.totalCompeUp[0].colla,
                ];

                setRawData({
                    categories: totalCompeCategories,
                    currentSemester: totalCompeValues,
                    differences: totalCompeDifferences,
                });

                // 지도 학생 역량 데이터 처리
                const guideCompeDifferences = [
                    mainData.stdCompeUp[0].lead,
                    mainData.stdCompeUp[0].plia,
                    mainData.stdCompeUp[0].orig,
                    mainData.stdCompeUp[0].self,
                    mainData.stdCompeUp[0].mento,
                    mainData.stdCompeUp[0].colla,
                ];

                setGuideRawData({
                    categories: totalCompeCategories,
                    currentSemester: totalCompeValues.map(
                        (value, index) => value - totalCompeDifferences[index] + guideCompeDifferences[index]
                    ),
                    differences: guideCompeDifferences,
                });

                // 미션 보류 학생 테이블 데이터 처리
                setTableData(
                    mainData.holdMission.map((mission) => ({
                        grade: mission.term.split("-")[0], // 학년 추정값
                        studentId: mission.student_std_id,
                        name: `학생 ${mission.student_std_id}`, // 이름을 데이터로 대체 필요
                        deferDate: mission.hold_date,
                        targetScore: mission.hold_figure,
                        level: mission.hold_figure >= 15 ? "높음" : "낮음", // 임의 로직
                    }))
                );

                // `localhost:4000/profacc`에서 Pie Chart 데이터 가져오기
                const pieResponse = await fetch("http://localhost:4000/profacc");
                const pieData = await pieResponse.json();

                // Pie Chart 데이터 생성
                setPieData({
                    labels: ["미션 수락", "미션 보류", "미션 거절", "미션 대기"],
                    datasets: [
                        {
                            data: [
                                pieData.selAccept.acc,
                                pieData.selAccept.hold,
                                pieData.selAccept.rej,
                                pieData.selAccept.wait,
                            ],
                            backgroundColor: ["#61CDBB", "#F1E15B", "#F47560", "#A6CEE3"],
                        },
                    ],
                });
            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        };

        fetchData();
    }, []);

    const toggleStudentDetails = (studentId) => {
        setExpandedStudentId((prevId) => (prevId === studentId ? null : studentId));
    };

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
            expandedStudentId={expandedStudentId} // 상태 전달
            toggleStudentDetails={toggleStudentDetails} // 함수 전달
        />
    );
};

export default ProfContainer;
