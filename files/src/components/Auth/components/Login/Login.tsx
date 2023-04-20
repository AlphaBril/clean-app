import React, { useState } from "react";

import { Form, Input, Button, Spin, Row } from "antd";

import { useTranslation } from "react-i18next";

import { LoginData } from "./Login.d";

import { useNavigation } from "src/ducks/navigation/navigation";
import { useAuthActions } from "src/ducks/auth/actions/auth";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("authentication");
  const { login } = useAuthActions();
  const { pushState } = useNavigation();

  const goToSignup = () => pushState("/auth/signup");
  const goToRecovery = () => pushState("/auth/recovery");

  const handleLogin = ({ username, password }: LoginData) => {
    setLoading(true);
    login(username, password);
    setLoading(false);
  };

  return (
    <Row justify="center" align="middle">
      <Form style={{ margin: "16px 0" }} name="login" onFinish={handleLogin}>
        <Form.Item
          label={t("username")}
          name="username"
          rules={[
            {
              required: true,
              message: t("username_missing"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[
            {
              required: true,
              message: t("password_missing"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="text" onClick={goToSignup}>
            {t("go_to_signup")}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="text" onClick={goToRecovery}>
            {t("go_to_recovery")}
          </Button>
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              {t("login")}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;
