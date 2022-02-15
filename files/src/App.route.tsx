import React from "react";

import { Route, Navigate, Routes } from "react-router-dom";

import App from "./components/App/App";

const AppRoute: React.FC = () => (
  <Routes>
    <Route path="*" element={<App />}></Route>
    <Route path="/" element={<Navigate to="/home" />}></Route>
  </Routes>
);

export default AppRoute;
