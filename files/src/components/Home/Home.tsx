import React, { useEffect } from "react";
import DisplayComponent from "./components/Display/Display";
import MotdComponent from "./components/Motd/Motd";
import { useAuth } from "src/ducks/auth/actions/auth";
import { useNavigation } from "src/ducks/navigation/navigation";
import styles from "./Home.module.css";
import { Col, Row } from "antd";

const Home: React.FC = () => {
  const auth = useAuth();
  const { pushState } = useNavigation();

  useEffect(() => {
    if (!auth.isAuthenticated) pushState("/auth/login");
  }, [auth]);
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
