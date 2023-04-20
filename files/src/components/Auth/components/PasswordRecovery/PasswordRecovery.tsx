import React, { useState } from "react";
import { Row, Form, Input, Spin, Button } from "antd";
import { useTranslation } from "react-i18next";

import { FormData } from "./PasswordRecovery.d";
import { useNavigation } from "src/ducks/navigation/navigation";
import { useUser } from "src/ducks/user/actions/user";

const PasswordRecovery: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { passwordRecovery } = useUser();
  const { pushState } = useNavigation();
  const { t } = useTranslation("authentication");

  const goToLogin = () => pushState("/auth/login");
  const handlePasswordRecovery = (values: FormData) => {
    setLoading(true);
    passwordRecovery(values.email);
    setLoading(false);
    pushState("/auth/login");
  };

  return (
    <Row justify="center" align="middle">
      <Form
        style={{ margin: "16px 0" }}
        name="signup"
        onFinish={handlePasswordRecovery}
      >
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

        <Form.Item>
          <Button type="text" onClick={goToLogin}>
            {t("go_to_login")}
          </Button>
        </Form.Item>

        <Form.Item>
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              {t("recover password")}
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default PasswordRecovery;
