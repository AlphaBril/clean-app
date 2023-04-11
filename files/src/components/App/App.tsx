import React, { useEffect } from "react";

import { message, Layout, Typography } from "antd";

import {
  useMessage,
  useMessageActions,
} from "src/ducks/message/actions/message";

import Routes from "./App.route";

import styles from "./App.module.css";

const { Content, Header } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const messageState = useMessage();
  const { clearMessage } = useMessageActions();

  useEffect(() => {
    if (messageState.status) {
      messageApi.open({
        type: messageState.status,
        content: messageState.value,
      });
    }
    clearMessage();
  }, [messageState]);

  return (
    <Layout>
      {contextHolder}
      <Header className={styles.header}>
        <Title className={styles.title}>CLEAN-APP</Title>
      </Header>
      <Content className={styles.content}>
        <Routes />
      </Content>
    </Layout>
  );
};

export default App;
