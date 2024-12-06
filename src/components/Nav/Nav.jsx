import React from "react";
import logoImage from '../../assets/h1_logo.png';
import './Nav.css';

const Nav = ({

}) => {
    return (
        <div className="nav-container">
            <div className="nav-logo">
                <a className="logo">
                    <img src={logoImage} alt="logo" />
                </a>
            </div>
            <div className="nav-span">
                <div>
                    <h4>비교과 프로그램</h4>
                </div>
                <div>
                    <h4>나의 활동</h4>
                </div>
            </div>
        </div>
    )
}

export default Nav;