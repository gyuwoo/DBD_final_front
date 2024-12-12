import React from "react";
import './StdProgram.css';
import { useNavigate } from "react-router-dom";

const getProgramImage = (programId) => {
    try {
        return require(`../../../../../assets/program/${programId}.png`)
    } catch (error) {
        return;
    }
};

export const StdProgram = ({
    programs,
    recommendProgram
}) => {

    const navigate = useNavigate();

    return (
        // 메인 프로그램 리스트
        <div className="program-list-wrapper">
            {recommendProgram?.map((program) => (
                <div className="program-card" key={program.id} onClick={() => navigate('/detail')}>
                {/* 상태 표시 */}
                {/* <div className={`program-state ${program.state === "모집중" ? "active" : ""}`}>
                    {program.state}
                </div> */}

                {/* 이미지 */}
                <div className="program-img">
                    <img src={getProgramImage(program.id)} alt={program.program_name} />
                </div>

                {/* 정보 */}
                <div className="program-info">
                    <h3 className="program-title">{program.program_name}</h3>
                    {/* 역량 */}
                    <div className="compe-info">
                        {program.compe_name} {program.compe_figure}
                    </div>
                    <p className="apli-period">
                    신청: {program.apli_start} ~ {program.apli_final}
                    </p>
                    <p className="progress-hours">
                    활동: {program.progress_start} ~ {program.progress_final}
                    </p>
                </div>

                {/* 접수 상태 */}
                <div className="accept-status">
                    신청/모집 <strong className="accept-status-strong">  {program.appi_people}/{program.rec_people}</strong>
                </div>
                </div>
            ))}
    </div>
    )
}