import React, { useState, useEffect } from "react";
import { Route, Routes, useFetcher } from 'react-router-dom';
import { Main, SignIn, SignUp } from "./pages";

const Router = () => {
    return (
        <div className="app">
            <Routes>
                <Route
                    path="/"
                    element={<Main />}
                />
                <Route
                    path="/signin"
                    element={<SignIn />}
                />
                <Route
                    path="/signup"
                    element={<SignUp />}
                />
            </Routes>
        </div>
    )
}

/* App/App.js에서 import하기 위한 설정 */
export default Router;