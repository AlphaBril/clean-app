import React from "react";
import DisplayComponent from "./components/Display/Display";
import MotdComponent from "./components/Motd/Motd";
import styles from "./Home.module.css";
import { Col, Row } from "antd";

const Home: React.FC = () => {
  return (
    <Col className={styles.home}>
      <Row className={styles.motd}>
        <MotdComponent message={"BONJOUR"}></MotdComponent>
      </Row>
      <Row className={styles.userInfo}>
        <DisplayComponent></DisplayComponent>
      </Row>
    </Col>
  );
};

export default Home;
