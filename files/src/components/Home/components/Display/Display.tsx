import React, { useEffect, useMemo } from "react";
import { Descriptions } from "antd";
import { useUser, useUserActions } from "src/ducks/user/actions/user";
import { useTranslation } from "react-i18next";

const Display: React.FC = () => {
  const { getUserInfo } = useUserActions();
  const { t } = useTranslation("display");
  const user = useUser();

  useEffect(() => {
    getUserInfo();
  }, []);

  const userInfo = useMemo(() => {
    return user;
  }, [user]);
  return (
    <Descriptions title={t("user_info")}>
      <Descriptions.Item label={t("username")}>
        {userInfo.username}
      </Descriptions.Item>
      <Descriptions.Item label={t("firstname")}>
        {userInfo.firstname}
      </Descriptions.Item>
      <Descriptions.Item label={t("lastname")}>
        {userInfo.lastname}
      </Descriptions.Item>
      <Descriptions.Item label={t("email")}>{userInfo.email}</Descriptions.Item>
    </Descriptions>
  );
};

export default Display;
