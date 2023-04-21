import React, { useEffect, useMemo } from "react";
import { Descriptions } from "antd";
import { useUser, useUserActions } from "src/ducks/user/actions/user";

const Display: React.FC = () => {
  const { getUserInfo } = useUserActions();
  const user = useUser();

  useEffect(() => {
    getUserInfo();
  }, []);

  const userInfo = useMemo(() => {
    return user;
  }, [user]);
  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserName">
        {userInfo.username}
      </Descriptions.Item>
      <Descriptions.Item label="Firstname">
        {userInfo.firstname}
      </Descriptions.Item>
      <Descriptions.Item label="LastName">
        {userInfo.lastname}
      </Descriptions.Item>
      <Descriptions.Item label="Email">{userInfo.email}</Descriptions.Item>
    </Descriptions>
  );
};

export default Display;
