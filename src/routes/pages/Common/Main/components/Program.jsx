import React from "react";
import './Program.css';

export const ProgramList = ({
    programs
}) => {

    return (
        // 메인 화면에 프로그램 리스트
        <ul className="program-list">
            {
                programs?.map(program => (
                    <li className="program">
                        <div className="program-status">
                            {program.status}
                        </div>
                        <div className="program-img">
                            <img src={program.img} alt="" />
                        </div>
                        <div className="info">
                            <div className="title">
                                {program.title}
                            </div>
                            <div className="operating_hours">
                                운영: {program.operating_start_hours} ~ {program.operating_end_hours}
                            </div>
                            <div className="application_period">
                                접수: {program.application_period_start} ~ {program.application_period_end}
                            </div>
                            <div className="manager">
                                {program.manager_department} : {program.manager_name}({program.manager_phone})
                            </div>
                        </div>
                        <div className="accept">
                            온라인 접수중 : {program.current_accept}/{program.max_accept}
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}