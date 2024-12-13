import React from "react";
import footerImage from '../../assets/footer_logo.png';
import './Footer.css';

const Footer = ({

}) => {
    return (
        <footer>
            <img src={footerImage} alt="" />
            <div className="copyright">
                <div>(47011) 부산광역시 사상구 주례로 47 (주례동) 동서대학교 T 051.320.1694</div>
                <div>Copyright © 2022 by Dongseo University. All rights reserved.</div>
            </div>
            <ul className="privacy">
                <li>개인정보처리방침</li>
                <li>이메일주소무단수집거부</li>
            </ul>
        </footer>
    )
}

export default Footer;