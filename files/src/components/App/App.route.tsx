import React from "react";

import { Route, Routes } from "react-router-dom";

import HomeComponent from "src/components/Home/Home";
import AuthComponent from "src/components/Auth/Auth";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/home" element={<HomeComponent />}></Route>
    <Route path="/auth/*" element={<AuthComponent />}></Route>
  </Routes>
);

export default AppRoutes;
