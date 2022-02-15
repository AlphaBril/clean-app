import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const pushState = useNavigate();
  const user = localStorage.getItem("user");
  if (user) {
    pushState("/");
  } else {
    pushState("/auth");
  }
};

export default useAuth;
