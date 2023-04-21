import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigation } from "src/ducks/navigation/navigation";
import { useUserActions } from "src/ducks/user/actions/user";

const Activate: React.FC = () => {
  const { activateUser } = useUserActions();
  const { pushState } = useNavigation();
  const { token } = useParams();

  useEffect(() => {
    const path = window.location.pathname.split("/");
    if (token && path.length === 4) {
      activateUser(token);
      pushState("/auth/login");
    } else pushState("/auth/login");
  }, []);

  return <></>;
};

export default Activate;
