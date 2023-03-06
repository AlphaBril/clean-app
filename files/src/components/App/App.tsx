import React, { useMemo } from "react";

import { message } from "antd";

import { Layout, Typography } from "antd";
import {
  useMessage,
  useMessageActions,
} from "src/ducks/message/actions/message";

import Routes from "./App.route";

import styles from "./App.module.css";

const { Content, Header } = Layout;

const App: React.FC = () => {
  const messageState = useMessage();
  const { clearMessage } = useMessageActions();

  useMemo(() => {
    if (messageState.status === "error") {
      message.error(messageState.value);
    } else if (messageState.status === "success") {
      message.success(messageState.value);
    } else if (messageState.status === "info") {
      message.info(messageState.value);
    }
    clearMessage();
  }, [message, messageState]);

  return (
    <Layout>
      <Header>
        <Typography.Title style={{ color: "#aaaaaa" }}>
          CLEAN-APP
        </Typography.Title>
      </Header>
      <Content className={styles.content}>
        <Routes />
      </Content>
    </Layout>
  );
};

export default App;
