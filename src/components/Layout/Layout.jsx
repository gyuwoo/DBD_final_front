import React from "react";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import Article from "../Article/Article";
import Footer from "../Footer/Footer";

import btnGoTop from '../../assets/btn_go_top.png';

import './Layout.css';

const Layout = ({
    children,
}) => {

    return (
        <div className="layout">
            <Header />
            <Nav />
            <Article children={children} />
            <Footer />
            <a href="#" className="btn-go-top">
                <img src={btnGoTop} alt="" className="btn-go-top" />
            </a>
        </div>
    )
}

export default Layout;