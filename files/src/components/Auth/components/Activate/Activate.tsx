import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthentication } from "src/ducks/authentication/actions/authentication";
import { useNavigation } from "src/ducks/navigation/navigation";

const Activate: React.FC = () => {
  const { activateUser } = useAuthentication();
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
