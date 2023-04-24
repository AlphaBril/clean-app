import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import usePersist from "src/hooks/usePersist";
import { useAuth, useAuthActions } from "src/ducks/auth/actions/auth";
import { Button, Card, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigation } from "src/ducks/navigation/navigation";

const PersistLogin: React.FC = () => {
  const [persist] = usePersist();
  const { accessToken } = useAuth();
  const { refresh } = useAuthActions();
  const { pushState } = useNavigation();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("authentication");

  useEffect(() => {
    if (!accessToken && persist) {
      setLoading(true);
      refresh().then(
        () => setLoading(false),
        () => setLoading(false)
      );
    }
  }, []);

  if (loading)
    return (
      <Spin tip="Loading" size="large" style={{ marginTop: 100 }}>
        <div className="content" />
      </Spin>
    );
  else if (accessToken) return <Outlet />;
  return (
    <Card
      title={t("session_expired")}
      bordered={false}
      style={{ width: 300, margin: "auto" }}
    >
      <Space>
        <p>{t("your_session_expired")}</p>
        <Button type="primary" onClick={() => pushState("auth/login")}>
          {t("login")}
        </Button>
      </Space>
    </Card>
  );
};
export default PersistLogin;
