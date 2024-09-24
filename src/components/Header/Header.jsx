import React from "react";
import logoImage from '../../assets/h1_logo.png';
import './Header.css';

const Header = ({

}) => {
    return (
        <header>
            <a className="logo">
                <img src={logoImage} alt="logo" />
            </a>
            <ul className="signin-list">
                <li>
                    <a href="javascript:void(0)">
                        Student Login
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)">
                        교수자로그인
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0)">
                        운영자
                    </a>
                </li>
            </ul>
        </header>
    )
}

export default Header;