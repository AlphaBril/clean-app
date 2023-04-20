import React from "react";
import { Col, Row, Button } from "antd";
import { useAuthActions } from "src/ducks/auth/actions/auth";

const Display: React.FC<{ message: string }> = (props) => {
  const { logout } = useAuthActions();

  return (
    <Row>
      <Col>{props.message ? props.message : null}</Col>
      <Col>
        <Button onClick={() => logout()}>Disconnect</Button>
      </Col>
    </Row>
  );
};

export default Display;
