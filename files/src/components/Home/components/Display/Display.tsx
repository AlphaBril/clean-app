import React, { useState } from "react";
import { Col, Row } from "antd";

const Display: React.FC<{ message: string }> = (props) => {
  const user = localStorage.getItem("user");

  return (
    <Row>
      <Col>{props.message ? props.message : null}</Col>
    </Row>
  );
};

export default Display;
