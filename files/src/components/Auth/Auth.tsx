import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// import useAuth from "../../hooks/useAuth";

import LoginComponent from "./components/Login/Login";
import SignupComponent from "./components/Signup/Signup";
import ActivateComponent from "./components/Activate/Activate";
import ChangePasswordComponent from "./components/ChangePassword/ChangePassword";
import PasswordRecoveryComponent from "./components/PasswordRecovery/PasswordRecovery";

const Auth: React.FC = () => {
  // useAuth();

  return (
    <Routes>
      <Route path="/auth" element={<Navigate to="/auth/login" />} />
      <Route path="/auth/signup" element={<SignupComponent />} />
      <Route path="/auth/login" element={<LoginComponent />} />
      <Route path="/auth/activate" element={<ActivateComponent />} />
      <Route path="/auth/password" element={<ChangePasswordComponent />} />
      <Route path="/auth/recovery" element={<PasswordRecoveryComponent />} />
    </Routes>
  );
};

export default Auth;
