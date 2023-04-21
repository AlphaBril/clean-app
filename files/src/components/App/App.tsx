import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { message, Layout, Typography } from "antd";

import {
  useMessage,
  useMessageActions,
} from "src/ducks/message/actions/message";

import Routes from "./App.route";

import styles from "./App.module.css";
import { useAuth, useAuthActions } from "src/ducks/auth/actions/auth";

const { Content, Header } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [displayLogout, setDisplayLogout] = useState(false);
  const messageState = useMessage();
  const { clearMessage } = useMessageActions();
  const auth = useAuth();
  const { logout } = useAuthActions();

  useEffect(() => {
    if (messageState.status) {
      messageApi.open({
        type: messageState.status,
        content: messageState.value,
      });
    }
    clearMessage();
  }, [messageState]);

  useEffect(() => {
    if (auth.isAuthenticated) setDisplayLogout(true);
    else setDisplayLogout(false);
  }, [auth]);

  return (
    <Layout>
      {contextHolder}
      <Header className={styles.header}>
        <Title className={styles.title}>CLEAN-APP</Title>
        {displayLogout ? (
          <FontAwesomeIcon
            className={styles.icon}
            icon={faRightFromBracket}
            onClick={() => logout()}
          />
        ) : null}
      </Header>
      <Content className={styles.content}>
        <Routes />
      </Content>
    </Layout>
  );
};

export default App;
