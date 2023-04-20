import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigation } from "src/ducks/navigation/navigation";
import { useUser } from "src/ducks/user/actions/user";

const Activate: React.FC = () => {
  const { activateUser } = useUser();
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
