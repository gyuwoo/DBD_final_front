import React from "react"
import spotMain1 from '../../../../../assets/spot_main_01.png';
import spotMain2 from '../../../../../assets/spot_main_02.png';
import spotMain3 from '../../../../../assets/spot_main_03.png';

import './ShowSpot.css';

export const ShowSpot = ({

}) => {
    return (
        // 메인 화면 로그인이랑 미션 진척도 보여주는 부분
        <div className="show-spot">
            <div className="spot-1">
                <img src={spotMain1} className="spot-main-1" />
                <div className="spot-2">
                    <div className="spot-login">
                        <div className="spot-login-span">
                            <span>동서대학교 학생지원시스템의</span><br />
                            <span> <strong className="strong">'아이디, 비밀번호'</strong>로 로그인 가능합니다.</span>
                        </div>
                        <div className="spot-login-input">
                            <input
                                className="spot-login-input1" 
                                type="text" 
                                placeholder="사용자 아이디(User ID)를 입력하세요"/>
                            <input
                                className="spot-login-input1"
                                type="text" 
                                placeholder="비밀번호(Password)를 입력하세요"/>
                            <button className="login-button">로그인(Login)</button>
                        </div>
                    </div>
                    <div className="spot-mission">
                        <h3>진행중인 미션</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}