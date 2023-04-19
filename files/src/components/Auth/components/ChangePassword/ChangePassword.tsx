import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Row, Form, Input, Spin, Button } from "antd";

import { useAuthentication } from "src/ducks/authentication/actions/authentication";
import { useNavigation } from "src/ducks/navigation/navigation";

import { FormData } from "./ChangePassword.d";
import { useParams } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const { pushState } = useNavigation();
  const { changePassword } = useAuthentication();
  const { t } = useTranslation("authentication");

  useEffect(() => {
    const path = window.location.pathname.split("/");

    if (path.length !== 4) pushState("/auth/login");
  }, [pushState]);

  const handleChangePassword = (values: FormData) => {
    setLoading(true);
    if (token) changePassword(token, values.password);
    setLoading(false);
    pushState("/auth/login");
  };

  const newPasswordRules = [
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
  ];

  const confirmPasswordRules = [
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
  ];

  return (
    <Row justify="center" align="middle">
      <Form
        style={{ margin: "16px 0" }}
        name="signup"
        onFinish={handleChangePassword}
      >
        <Form.Item
          label={t("new password")}
          name="password"
          rules={newPasswordRules}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={t("confirm new password")}
          name="checkPassword"
          dependencies={["password"]}
          rules={
            confirmPasswordRules && [
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]
          }
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              {t("update password")}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ChangePassword;
