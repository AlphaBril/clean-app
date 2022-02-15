import React, { useEffect } from "react";
// import { useAuthentication } from "src/ducks/authentication/actions/authentication";
import { useNavigation } from "src/ducks/navigation/navigation";

const Activate: React.FC = () => {
  // const { activateUser } = useAuthentication();
  const { pushState } = useNavigation();

  useEffect(() => {
    const path = window.location.pathname.split("/");

    if (path.length === 4) {
      // activateUser(path[3]);
    } else pushState("/auth");
  }, [pushState]);

  return <></>;
};

export default Activate;
