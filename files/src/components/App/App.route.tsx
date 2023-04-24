import React from "react";

import { Route, Routes } from "react-router-dom";

import HomeComponent from "src/components/Home/Home";
import AuthComponent from "src/components/Auth/Auth";
import PersistLogin from "../Auth/components/PersistLogin/PersistLogin";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<PersistLogin />}>
      <Route path="/home" element={<HomeComponent />}></Route>
    </Route>
    <Route path="/auth/*" element={<AuthComponent />}></Route>
  </Routes>
);

export default AppRoutes;
