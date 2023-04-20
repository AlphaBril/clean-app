import React, { useState } from "react";

import { Row, Form, Button, Input } from "antd";
import { Spin } from "antd";

import { useTranslation } from "react-i18next";

import { SignupData } from "./Signup.d";

import { useNavigation } from "src/ducks/navigation/navigation";
import { useUser } from "src/ducks/user/actions/user";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation("authentication");
  const { signup } = useUser();
  const { pushState } = useNavigation();

  const goToLogin = () => pushState("/auth/login");
  const handleSignup = (user: SignupData) => {
    setLoading(true);
    signup({ ...user });
    setLoading(false);
  };

  return (
    <Row justify="center" align="middle">
      <Form style={{ margin: "16px 0" }} name="signup" onFinish={handleSignup}>
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
          label={t("firstname")}
          name="firstname"
          rules={[
            {
              required: true,
              message: t("firstname_missing"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("lastname")}
          name="lastname"
          rules={[
            {
              required: true,
              message: t("lastname_missing"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("email")}
          name="email"
          rules={[
            {
              required: true,
              message: t("email_missing"),
              type: "email",
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
            {
              min: 8,
              message: t("password_too_short"),
            },
            {
              pattern: new RegExp("^.*[0-9]$"), // TODO change regex for d
              message: t("password_contain"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="text" onClick={goToLogin}>
            {t("go_to_login")}
          </Button>
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              {t("signup")}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Signup;
