import React, { useState } from "react";
import "./ApplicationModal.css";

const ApplicationModal = ({ isOpen, onClose, programData }) => {
  const [selectedForm, setSelectedForm] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  if (!isOpen) return null; // 팝업이 닫혀있으면 렌더링하지 않음

  const handleFormChange = (e) => {
    const value = e.target.value;
    setSelectedForm(value);

    // 선택된 서식에 따라 자동 입력
    if (value === "basic") {
      setStudentId(""); // 초기화
      setName("");
      setGrade("");
    } else if (value === "custom") {
      setStudentId("20206789");
      setName("김태연");
      setGrade("4");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedForm) {
      alert("서식을 선택해주세요!");
      return;
    }

    const applicationData = {
      program_id: programData.id,
      program_name: programData.program_name,
      compe_name: programData.compe_name,
    };

    try {
      const response = await fetch("http://localhost:4000/programApli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        alert("프로그램 신청이 완료되었습니다!");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`신청 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("신청 에러:", error);
      alert("신청 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="modal-title">프로그램 신청</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* 프로그램 정보 */}
          <div className="program-info">
            <p>
              <strong>프로그램명:</strong> {programData.program_name}
            </p>
            <p>
              <strong>신청 기간:</strong> {programData.apli_start} ~{" "}
              {programData.apli_final}
            </p>
            <p>
              <strong>운영 기간:</strong> {programData.progress_start} ~{" "}
              {programData.progress_final}
            </p>
          </div>

          {/* 서식 선택 */}
          <label htmlFor="form-select">신청 서식 선택</label>
          <select
            id="form-select"
            value={selectedForm}
            onChange={handleFormChange}
            required
          >
            <option value="">서식을 선택해주세요</option>
            <option value="custom">태연이의 서식</option>
          </select>

          {/* 학번 */}
          <label htmlFor="student-id">학번</label>
          <input
            id="student-id"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="학번을 입력해주세요"
            required
          />

          {/* 학년 */}
          <label htmlFor="grade">학년</label>
          <input
            id="grade"
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="학년을 입력해주세요"
            required
          />

          {/* 이름 */}
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            required
          />

          {/* 제출 버튼 */}
          <button type="submit" className="submit-button">
            신청
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
