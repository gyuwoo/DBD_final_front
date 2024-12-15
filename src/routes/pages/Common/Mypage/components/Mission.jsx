import React, { useState } from "react";
import "./Mission.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Mission = ({ missionData }) => {
  const { mission, stdCompe, stdCompeUp, pastMission, missionCompe, hold } = missionData;
  const [popupCompeData, setPopupCompeData] = useState([]); //보류신청 시 수치조정 팝업에 뜨는 데이터
  const [totalScore, setTotalScore] = useState(60); // 보류신청 시 역량 수치 총합
  const [adjustedScores, setAdjustedScores] = useState(stdCompe.map(() => 10)); // 희망 수치 배열
  const [missionPrograms, setMissionPrograms] = useState([]); // 이전 미션 클릭 시 나오는 상세 정보
  const [showModal, setShowModal] = useState(false); // 상세 정보 모달 띄움 안띄움
  const [status, setStatus] = useState(mission[0].accept); // 현재 상태: "보류", "수락", "거절"


  const getHold = async () => {
    try {
      const response = await fetch("http://localhost:4000/hold", {
        method: "GET",
        credentials: "include",
      });
      const holdData = await response.json();
      console.log("Raw holdData:", holdData);

      if (holdData.compe) {
        const parsedData = holdData.compe.flatMap((item) =>
          Object.entries(item).map(([key, value]) => ({
            compe_name: mapFieldToName(key), // 역량명을 변환
            compe_score: value, // 점수
          }))
        );
        console.log("Parsed popupCompeData:", parsedData);
        setPopupCompeData(parsedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 미션 클릭 처리 함수
  const handleMissionClick = async (term) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/missionProgram",
        { term }
      );
      setMissionPrograms(response.data.missionProgram);
      console.log(missionPrograms);
      setShowModal(true);
    } catch (error) {
      console.error("미션 프로그램을 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  // 팝업창 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  const mapFieldToName = (key) => {
    return (
      {
        colla: "협동",
        lead: "리더십",
        mento: "멘토링",
        orig: "독창성",
        plia: "유연성",
        self: "자기개발",
      }[key] || "알 수 없는 역량"
    );
  };

  // 희망 수치 변경 핸들러
  const handleInputChange = (e, index) => {
    const newScore = parseInt(e.target.value, 10);

    // 총합 계산
    const newAdjustedScores = [...adjustedScores];
    newAdjustedScores[index] = newScore;

    const newTotalScore = newAdjustedScores.reduce(
      (acc, curr) => acc + curr,
      0
    );

    if (newTotalScore > 60) {
      alert("총 수치는 60점을 초과할 수 없습니다.");

      e.target.value = adjustedScores[index]; 
      return;
    }

    setAdjustedScores(newAdjustedScores);
    setTotalScore(newTotalScore);
  };

  // 보류 신청 핸들러
  const handleSubmit = async () => {
    if (totalScore > 60) {
      alert("총 수치가 60점을 초과합니다. 수정 후 다시 시도해주세요.");
      return;
    }

    try {
      const postHold = {
        compe_figure: popupCompeData,
        compe_name: adjustedScores.map((score, index) => ({
          score,
          name: popupCompeData[index].compe_name,
        })),
        mis_num: mission, // mis_num 데이터
      };

      const response = await fetch("http://localhost:4000/hold", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postHold),
      });

      if (response.ok) {
        alert("보류 신청이 성공적으로 제출되었습니다.");
        closePopup();
        window.location.reload();
      } else {
        alert("보류 신청 중 오류가 발생했습니다.");
        window.location.reload();
      }
    } catch (err) {
      console.error("보류 신청 에러:", err);
      alert("보류 신청 중 오류가 발생했습니다.");
      window.location.reload();
    }
  };

  const [isPopupVisible, setPopupVisible] = useState(false);

  // 버튼 클릭 시 함수
  const openPopup = async () => {
    await getHold();
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };


  // 수락, 거절 버튼 함수
  const handleMissionStatus = async (type, misNum) => {
    const confirmMessage =
      type === "거절"
        ? "정말로 미션을 거절하시겠습니까?"
        : "정말로 미션을 수락하시겠습니까?";
  
    const userConfirmed = window.confirm(confirmMessage);
  
    if (!userConfirmed) {
      alert("취소되었습니다.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:4000/mission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          type: type, // 수락 또는 거절 타입
          mis_num: misNum, // 미션 번호
        }),
      });
  
      if (!response.ok) {
        throw new Error(`서버 응답 실패: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("미션 상태 업데이트", data);
  
      alert(`미션이 ${type}되었습니다.`);
      window.location.reload();
    } catch (error) {
      console.error("미션 상태 변경 중 오류 발생:", error);
      alert(`미션 ${type} 중 오류가 발생했습니다.`);
      window.location.reload();
    }
  };
  

  const chartData = {
    labels: stdCompe.map((compe) => compe.compe_name),
    datasets: [
      {
        label: "지난 학기 역량",
        data: stdCompe.map((compe) => compe.compe_figure),
        backgroundColor: "#CCEBC5",
      },
      {
        label: "이번 학기 역량",
        data: stdCompeUp.map((compe) => compe.compe_up),
        backgroundColor: "#DECBE4",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  //미션 현황 계산
  let totalProgress = 0;
  let totalGoal = 0;

  // missionCompe가 배열인지 확인
  if (Array.isArray(missionCompe)) {
    totalProgress = missionCompe
      .filter((compe) => compe.accept !== "보류") // "보류" 상태인 미션 제외
      .reduce((sum, compe) => sum + (compe.progress_figure || 0), 0);

    totalGoal = missionCompe
      .filter((compe) => compe.accept !== "보류") // "보류" 상태인 미션 제외
      .reduce((sum, compe) => sum + compe.compe_figure, 0);
  } else {
    console.error("missionCompe is not an array");
  }

  return (
    <div className="mission-container">
      <div className="mission-header">
        <div>
          <span>
            미션 현황 : {totalProgress} /{" "}
            <strong className="total-goal">{totalGoal}</strong>
          </span>
        </div>
        <div>
          <span>수락 마감 일자 : {mission[0].final_date}</span>
        </div>

        {mission[0].accept === "보류" ? (
          <>
            <div className="mission-btn">
              <span>미션 상태</span>
              <button className="hold-ok-btn">수락</button>
              <button className="hold-hold-btn">보류</button>
              <button className="hold-no-btn">거절</button>
            </div>
          </>
        ) : hold === "보류한적 있음" ? (
          <>
            <div className="mission-btn">
              <span>미션 상태</span>
              <button
                className="ok-btn"
                onClick={() => handleMissionStatus("수락", mission[0].mis_num)}
              >
                수락
              </button>
              <button
                className="no-btn"
                onClick={() => handleMissionStatus("거절", mission[0].mis_num)}
              >
                거절
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mission-btn">
              <span>미션 상태</span>
              <button
                className="ok-btn"
                onClick={() => handleMissionStatus("수락", mission[0].mis_num)}
              >
                수락
              </button>
              <button className="hold-btn" onClick={openPopup}>
                보류
              </button>
              <button
                className="no-btn"
                onClick={() => handleMissionStatus("거절", mission[0].mis_num)}
              >
                거절
              </button>
            </div>
          </>
        )}



      </div>
      <div className="chart-section">
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
        {mission[0].accept === "보류" && (
          <h2 className="centered-message">
            지도 교수님의 응답을 기다리고 있습니다.
          </h2>
        )}
        <table
          className={`info-table ${
            mission[0].accept === "보류" ? "hold-info-table" : ""
          }`}
        >
          <thead>
            <tr>
              <th>핵심 역량</th>
              <th>역량 점수</th>
              <th>진척도</th>
              <th>진행 상태</th>
            </tr>
          </thead>
          {mission[0].accept === "보류" ? (
            <>
            
            </>
          ) : (
            <>
              <tbody>
                {missionCompe.map((compe, index) => (
                  <tr key={index}>
                    <td>{compe.compe_name}</td>
                    <td>{compe.compe_figure}</td>
                    <td>
                      {compe.progress_figure} / {compe.compe_figure}
                    </td>
                    <td>{mission[0].accept}</td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>

      {/* 이전 미션 목록 */}
      <div className="mission-history-section">
        <h3 className="section-title">이전 미션 목록</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>시행 학기</th>
              <th>목표 역량 수치</th>
              <th>이수 역량 수치</th>
              <th>수락 날짜</th>
              <th>종료 날짜</th>
              <th>수락 여부</th>
              <th>진행 여부</th>
            </tr>
          </thead>
          <tbody>
            {pastMission.map((mission, index) => (
              <tr
                className="tr"
                key={index}
                onClick={() => handleMissionClick(mission.term)}
              >
                <td>{mission.term}</td>
                <td>{mission.total}</td>
                <td>{mission.progress}</td>
                <td>{mission.progress_date}</td>
                <td>{mission.final_date}</td>
                <td>{mission.accept}</td>
                <td>{mission.mis_state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 보류 신청 팝업창 */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <button className="close-btn" onClick={closePopup}>
                &times;
              </button>
              <h3>보류 신청서</h3>
            </div>
            <p className="description">
              변경을 원하는 역량의 <span className="highlight">희망 수치</span>
              (5점 단위)를 적어주세요.
            </p>
            <form>
              {popupCompeData.map((compe, index) => (
                <div key={index} className="form-row">
                  <div className="form-group">
                    <label className="label">역량명: {compe.compe_name}</label>
                  </div>
                  <div className="form-group">
                    <span className="fixed-value">
                      부여 수치: {compe.compe_score}
                    </span>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <label className="input-label">희망 수치:</label>
                      <input
                        type="number"
                        defaultValue={compe.compe_score}
                        max={60}
                        min={0}
                        step={5}
                        className="input-field"
                        onChange={(e) => handleInputChange(e, index)}
                      />{" "}
                      점
                    </div>
                  </div>
                </div>
              ))}
            </form>
            <div className="popup-footer">
              <span className="total-score">
                역량 수치 총 합: <b>{totalScore}점</b>
              </span>
              <p className="footer-note">
                * 총 수치는 60점이 넘지 않아야합니다
              </p>
              <button className="submit-btn" onClick={handleSubmit}>
                보류 신청
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 이전 미션 프로그램 목록 팝업창 */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>미션 프로그램 목록</h3>
            <table className="modal-table">
              <thead>
                <tr className="modal-table-tr">
                  <th className="modal-table-th">역량명</th>
                  <th className="modal-table-th">역량 수치</th>
                  <th className="modal-table-th">프로그램 명</th>
                  <th className="modal-table-th">운영일시</th>
                  <th className="modal-table-th">진행 상태</th>
                  <th className="modal-table-th">비고</th>
                </tr>
              </thead>
              <tbody className="modal-table-tbody">
                {missionPrograms.map((program, index) => (
                  <tr key={index}>
                    <td className="modal-table-td">{program.compe_name}</td>
                    <td className="modal-table-td">{program.compe_figure}</td>
                    <td className="modal-table-td">{program.program_name}</td>
                    <td className="modal-table-td">
                      {program.progress_start}~{program.progress_final}
                    </td>
                    <td className="modal-table-td">{program.progress_state}</td>
                    <td className="modal-table-td">
                      <button>상세보기</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="modal-close-btn" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
