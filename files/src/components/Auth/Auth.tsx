import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginComponent from "./components/Login/Login";
import SignupComponent from "./components/Signup/Signup";
import ActivateComponent from "./components/Activate/Activate";
import ChangePasswordComponent from "./components/ChangePassword/ChangePassword";
import PasswordRecoveryComponent from "./components/PasswordRecovery/PasswordRecovery";

const Auth: React.FC = () => {

  return (
    <Routes>
      <Route path="signup" element={<SignupComponent />}></Route>
      <Route path="login" element={<LoginComponent />}></Route>
      <Route path="activate" element={<ActivateComponent />}></Route>
      <Route path="password" element={<ChangePasswordComponent />}></Route>
      <Route path="recovery" element={<PasswordRecoveryComponent />}></Route>
    </Routes>
  );
};

export default Auth;
