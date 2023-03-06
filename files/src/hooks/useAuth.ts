import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const pushState = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      console.log(user);
    } else {
      pushState("/auth/login");
    }
  });
};

export default useAuth;
