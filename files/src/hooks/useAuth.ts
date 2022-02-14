import { useDispatch } from "react-redux";
import { push as pushState } from "connected-react-router";

const useAuth = () => {
  const user = localStorage.getItem("user");
  const dispatch = useDispatch();
  if (user) dispatch(pushState("/"));
};

export default useAuth;
