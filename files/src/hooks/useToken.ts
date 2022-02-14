import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";

const useToken = () => {
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  if (user) {
    const decoded = (jwt.decode(user) as any).exp as number;
    if (Date.now() > decoded) {
      localStorage.removeItem("user");
      dispatch({
        type: "ERROR_MESSAGE",
        payload: "Your token is expired, please login again",
      });
    }
  }
};

export default useToken;
