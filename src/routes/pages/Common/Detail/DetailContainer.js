import React, { useState, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";

const Container = () => {
    const [program, setProgram] = useState(null); // 프로그램 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리

    useEffect(() => {
        // 데이터 가져오기
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/program"); // API 호출
                if (!response.ok) {
                    throw new Error("데이터를 가져오는 데 실패했습니다.");
                }
                const data = await response.json();
                setProgram(data.program); // 프로그램 데이터를 상태에 저장
            } catch (err) {
                setError(err.message); // 에러 메시지 저장
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchData();
    }, []); // 컴포넌트가 마운트될 때 실행

    // 로딩 상태 처리
    if (loading) {
        return <div>로딩 중...</div>;
    }

    // 에러 상태 처리
    if (error) {
        return <div>에러: {error}</div>;
    }

    // 데이터가 없을 경우 처리
    if (!program) {
        return <div>프로그램 데이터가 없습니다.</div>;
    }

    // 프로그램 데이터를 DetailPresenter에 전달
    return <DetailPresenter program={program} />;
};

export default Container;
