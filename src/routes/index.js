import React, { useState, useEffect } from "react";
import { Route, Routes, useFetcher } from 'react-router-dom';
import { Main, Prof, Std, My, Detail } from "./pages";
import axios from "axios";
axios.defaults.withCredentials = true;

const Router = () => {
    return (
        <div className="app">
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
                />
                <Route
                    path="/prof"
                    element={<Prof />}
                />
                <Route
                    path="/std"
                    element={<Std />}
                />
                <Route
                    path="/mypage"
                    element={<My />}
                />
                <Route
                    path="/detail"
                    element={<Detail />}
                />
            </Routes>
        </div>
    )
}
/* App/App.js에서 import하기 위한 설정 */
export default Router;