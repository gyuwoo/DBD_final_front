import React, { useState, useEffect } from "react";
import ProfPresenter from "./ProfPresenter";

const ProfContainer = () => {
    const [rawData, setRawData] = useState(null);
    const [guideRawData, setGuideRawData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [expandedStudentId, setExpandedStudentId] = useState(null);
    const [professorName, setProfessorName] = useState("교수님");
    const [studentBarChartData, setStudentBarChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mainResponse = await fetch("http://localhost:4000/profmain");
                const mainData = await mainResponse.json();

                setProfessorName(mainData.name?.[0]?.name || "교수님");

                const totalCompeCategories = ["리더십", "유연성", "독창성", "자기개발", "멘토링", "협동"];
                const totalCompeValues = Object.values(mainData.totalCompe[0]);
                const totalCompeDifferences = Object.values(mainData.totalCompeUp[0]);

                setRawData({
                    categories: totalCompeCategories,
                    currentSemester: totalCompeValues,
                    differences: totalCompeDifferences,
                });

                const guideCompeDifferences = Object.values(mainData.stdCompeUp[0]);
                setGuideRawData({
                    categories: totalCompeCategories,
                    currentSemester: totalCompeValues.map(
                        (value, index) => value - totalCompeDifferences[index] + guideCompeDifferences[index]
                    ),
                    differences: guideCompeDifferences,
                });

                const studentData = mainData.holdStd.map((student, index) => {
                    // 각 학생에 대한 mission_mis_num 기준으로 필터링
                    const studentMissions = mainData.holdMission.filter((mission) =>
                        index === 0
                            ? mission.mission_mis_num === 2128 // 첫 번째 학생
                            : mission.mission_mis_num === 2130 // 두 번째 학생
                    );
                
                    return {
                        studentId: student.std_id,
                        name: student.name,
                        grade: student.grade,
                        deferDate: studentMissions[0]?.hold_date || "-", // 첫 번째 미션의 날짜
                        targetScore: studentMissions.reduce(
                            (sum, mission) => sum + (mission.hold_figure || 0),
                            0
                        ), // hold_figure 합산
                        holdList: studentMissions.map((mission) => ({
                            compe_name: mission.compe_name || "-",
                            hold_figure: mission.hold_figure || 0,
                            compe_figure: mission.compe_figure || 0,
                            mis_num: mission.mission_mis_num || null,
                        })),
                    };
                });
                
                console.log("Processed Student Data:", studentData);
                
                
                setTableData(studentData);
                console.log("studentData:", studentData);
                

                const pieResponse = await fetch("http://localhost:4000/profacc");
                const pieData = await pieResponse.json();

                const pieChartData = Object.entries(pieData.selAccept)
                    .filter(([_, value]) => value > 0)
                    .map(([key, value]) => ({ label: key, value }));

                setPieData({
                    labels: pieChartData.map((item) => {
                        if (item.label === "acc") return "미션 수락";
                        if (item.label === "hold") return "미션 보류";
                        if (item.label === "rej") return "미션 거절";
                        if (item.label === "wait") return "미션 대기";
                        return item.label;
                    }),
                    datasets: [
                        {
                            data: pieChartData.map((item) => item.value),
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

    const handleBatchSubmit = async () => {
        try {
            const batchData = tableData.map((student) => ({
                std_id: student.studentId,
                mis_num: student.holdList[0]?.mis_num || null,
                compe: student.holdList.map((holdItem) => ({
                    compe_name: holdItem.compe_name,
                    hold_figure: holdItem.hold_figure,
                })),
            }));

            const requestBody = {
                data: batchData,
                type: "일괄",
            };

            const response = await fetch("http://localhost:4000/profholdacc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                console.log("일괄 처리 성공:", await response.json());
                alert("일괄 처리가 완료되었습니다!");
            } else {
                console.error("일괄 처리 실패:", response.status);
                alert("일괄 처리에 실패했습니다.");
            }
        } catch (error) {
            console.error("일괄 처리 중 오류 발생:", error);
            alert("일괄 처리 중 오류가 발생했습니다.");
        }
    };

    const fetchStudentBarChartData = async (studentId) => {
        try {
            const response = await fetch("http://localhost:4000/profacc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ std_id: studentId }),
            });

            if (response.ok) {
                const data = await response.json();
                setStudentBarChartData(data);
            } else {
                console.error("Failed to fetch student bar chart data");
            }
        } catch (error) {
            console.error("Error fetching student bar chart data:", error);
        }
    };

    const postAdjustments = async (studentId, adjustments) => {
        try {
            const compe = adjustments.map((item) => ({
                compe_name: item.compe_name,
                hold_figure: item.hold_figure,
            }));

            const requestBody = {
                compe,
                mis_num: adjustments[0].mis_num,
                type: "개별",
                std_id: studentId,
            };

            const response = await fetch("http://localhost:4000/profholdacc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                console.log("조정 데이터 전송 성공:", await response.json());
                alert("조정이 완료되었습니다!");
            } else {
                console.error("조정 데이터 전송 실패:", response.status);
                alert("조정 데이터 전송에 실패했습니다.");
            }
        } catch (error) {
            console.error("조정 데이터 전송 중 오류 발생:", error);
            alert("조정 데이터 전송 중 오류가 발생했습니다.");
        }
    };

    const toggleStudentDetails = async (studentId) => {
        if (expandedStudentId === studentId) {
            setExpandedStudentId(null);
            setStudentBarChartData(null);
        } else {
            setExpandedStudentId(studentId);
            await fetchStudentBarChartData(studentId);
        }
    };

    if (!rawData || !guideRawData || !pieData || tableData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <ProfPresenter
            professorName={professorName}
            rawData={rawData}
            guideRawData={guideRawData}
            pieData={pieData}
            tableData={tableData}
            expandedStudentId={expandedStudentId}
            toggleStudentDetails={toggleStudentDetails}
            studentBarChartData={studentBarChartData}
            onAdjustSubmit={postAdjustments}
            onBatchSubmit={handleBatchSubmit}
        />
    );
};

export default ProfContainer;
