import React from "react";
import "./SearchBar.css"; // CSS 파일 import

const SearchBar = () => {
    return (
        <div className="search-bar">
        <div className="logo-section">
            <span className="logo">DSU</span>
            <div className="university-info">
            <div>Dongseo University</div>
            <div className="sub-text">동서대학교</div>
            </div>
        </div>
        <input
            type="text"
            className="search-input"
            placeholder="프로그램명, 분류명 등 검색할 키워드를 입력하세요"
        />
        <button className="search-button">
            <span className="search-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 10 L20 20 Z" fill="white" />
            </svg>

            </span>
        </button>
        </div>
    );
};

export default SearchBar;