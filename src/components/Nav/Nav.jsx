import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from '../../assets/h1_logo.png';
import './Nav.css';

const Nav = ({

}) => {

    const navigate = useNavigate();

    return (
        <div className="nav-container">
            <div className="nav-logo">
                <a className="logo">
                    <img src={logoImage} alt="logo" />
                </a>
            </div>
            <div className="nav-span">
                <div>
                    <h4 onClick={()=>{navigate('/std')}}>비교과 프로그램</h4>
                </div>
                <div>
                    <h4 onClick={()=>{navigate('/mypage')}}>나의 활동</h4>
                </div>
            </div>
        </div>
    )
}

export default Nav;