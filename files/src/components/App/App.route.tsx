import React from "react";

import { Route, Routes } from "react-router-dom";

import HomeComponent from "../Home/Home";
import AuthComponent from "../Auth/Auth";

const AppRoutes: React.FC = () => (
  <>
    <Routes>
      <Route path="/home" element={HomeComponent} />
      <Route path="/auth" element={AuthComponent} />
    </Routes>
  </>
);

export default AppRoutes;
