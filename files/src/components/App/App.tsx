import React, { useState } from "react";

import { Modal } from "antd";

import { Layout, Typography } from "antd";
import {
  useMessage,
  useMessageActions,
} from "src/ducks/message/actions/message";

import Routes from "./App.route";

import styles from "./App.module.css";

const { Content, Header } = Layout;

const App: React.FC = () => {
  const message = useMessage();
  const { clearMessage } = useMessageActions();

  const countDown = (text: string, error: boolean) => {
    let secondsToGo = 3;
    let modal: any;
    if (error) {
      modal = Modal.error({
        title: text,
      });
    } else {
      modal = Modal.success({
        title: text,
      });
    }
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({});
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      clearMessage();
      modal.destroy();
    }, secondsToGo * 1000);
  };

  if (message && message.message) {
    countDown(message.message, message.error);
  }

  return (
    <Layout>
      <Header>
        <Typography.Title style={{ color: "#fefefe" }}>MATCHA</Typography.Title>
      </Header>
      <Content className={styles.content}>
        <Routes />
      </Content>
    </Layout>
  );
};

export default App;
