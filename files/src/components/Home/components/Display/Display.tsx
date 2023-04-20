import React, { useMemo, useState } from "react";
import { useNavigation } from "src/ducks/navigation/navigation";
import { Col, Row, Button } from "antd";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jwt-decode";
import useAuth from "src/hooks/useAuth";

const Display: React.FC<{ message: string }> = (props) => {
  const [username, setUsername] = useState("");
  const [timeleft, setTimeleft] = useState("");
  const [issued, setIssued] = useState("");
  const user = sessionStorage.getItem("user");
  const { pushState } = useNavigation();

  useAuth();

  const disconnect = () => {
    sessionStorage.removeItem("user");
    pushState("/auth/login");
  };
  useMemo(() => {
    if (user) {
      const decoded: JwtPayload = jwt(user);
      if (decoded.exp)
        setTimeleft(new Date(decoded.exp * 1000).toLocaleString());
      if (decoded.iat) setIssued(new Date(decoded.iat * 1000).toLocaleString());
      if (decoded.usr) setUsername(decoded.usr);
    }
  }, [user]);
  return (
    <Row>
      <Col>
        {props.message ? props.message : null} {username}
      </Col>
      <Col>Your token was issued {issued}</Col>
      <Col>Your token expire in {timeleft}</Col>
      <Col>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </Col>
    </Row>
  );
};

export default Display;
