import { JwtPayload } from "jwt-decode";
import jwt from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TOKEN_EXPIRED,
  useMessageActions,
} from "src/ducks/message/actions/message";

const useAuth = () => {
  const pushState = useNavigate();
  const { setMessage } = useMessageActions();
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      pushState("/auth/login");
    } else {
      const decoded: JwtPayload = jwt(user);
      if (decoded.iss && decoded.iss !== "clean-app")
        sessionStorage.removeItem("user");
      if (decoded.exp) {
        if (decoded.exp * 1000 < Date.now()) {
          setMessage(TOKEN_EXPIRED);
          sessionStorage.removeItem("user");
        }
      }
    }
  });
};

export default useAuth;
