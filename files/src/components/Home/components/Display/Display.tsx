import React, { useMemo, useState } from "react";
import { useNavigation } from "src/ducks/navigation/navigation";
import { Col, Row, Button } from "antd";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jwt-decode";

const Display: React.FC<{ message: string }> = (props) => {
  const [username, setUsername] = useState("");
  const [timeleft, setTimeleft] = useState("");
  const user = localStorage.getItem("user");
  const { pushState } = useNavigation();

  const disconnect = () => {
    localStorage.removeItem("user");
    pushState("/auth/login");
  };
  useMemo(() => {
    if (user) {
      const decoded: JwtPayload = jwt(user);
      setTimeleft(new Date(Date.now() + decoded.exp!).toDateString());
      setUsername(decoded.username);
    }
  }, [user]);
  return (
    <Row>
      <Col>
        {props.message ? props.message : null} {username}
      </Col>
      <Col>Your token expire in {timeleft}</Col>
      <Col>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </Col>
    </Row>
  );
};

export default Display;
