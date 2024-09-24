import React from "react";
import btnSitemap from '../../assets/btn_sitemap.png';
import './Nav.css';

const Nav = ({

}) => {
    return (
        <nav>
            <ul>
                <li className="m01">
                    <div>마이페이지</div>
                    (My page)
                </li>
                <li className="m02">
                    <div>비교과프로그램</div>
                    (Co-curricular program)
                </li>
                <li className="m03">
                    <div>동서고금</div>
                    (All ages and countries)
                </li>
                <li className="m04">
                    <div>진단검사</div>
                    (Diagnositc tests)
                </li>
                <li className="m05">
                    <div>소단위전공과정</div>
                    (Micro Degree)
                </li>
                <li className="m06">
                    <div>커뮤니티</div>
                    (Community)
                </li>
                <li className="m07">
                    <div>상담</div>
                    (Consulting)
                </li>
            </ul>
            <a className="btn-sitemap" href="#">
                <img src={btnSitemap} alt="" />
            </a>
        </nav>
    )
}

export default Nav;