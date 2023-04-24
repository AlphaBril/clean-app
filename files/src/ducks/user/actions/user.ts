import { useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { MessageState, setMessage } from "src/ducks/message/messageSlice";
import { AxiosError } from "axios";

import { SignupData } from "src/components/Auth/components/Signup/Signup.d";
import { UserData } from "./user.d";
import { AppDispatch, RootState } from "src/store/configure";
import {
  EMAIL_SENT,
  PASSWORD_CHANGED,
  PASSWORD_UPDATED,
  USER_ACTIVATED,
  USER_REGISTRATED,
  USER_UPDATED,
} from "src/ducks/message/actions/message";
import axiosApiInstance from "src/utils/axios/axios";
import { UserState, setUser } from "../userSlice";

const SIGNUP_ENDPOINT = "user/signup";
const ACTIVATE_ENDPOINT = "user/activate";
const CHANGE_PASSWORD_ENDPOINT = "user/password";
const UPDATE_ENDPOINT = "user/update";
const RECOVER_PASSWORD_ENDPOINT = "user/recovery";
const GET_USER_INFO_ENDPOINT = "user";

const handleError = (dispatch: AppDispatch, error: AxiosError) => {
  const data = error.response?.data as { [key: string]: unknown };
  let errorMessage = "An error occured";
  if (data && typeof data === "object" && data.message) {
    errorMessage = JSON.stringify(data.message);
  }
  const message: MessageState = { value: errorMessage, status: "error" };
  dispatch(setMessage(message));
};

const signup = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  { email, username, password, firstname, lastname }: SignupData
) =>
  axiosApiInstance
    .post(SIGNUP_ENDPOINT, {
      email,
      username,
      password,
      firstname,
      lastname,
    })
    .then(
      () => {
        dispatch(setMessage(USER_REGISTRATED));
        navigate("/auth/login");
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const activateUser = (dispatch: AppDispatch, token: string) =>
  axiosApiInstance
    .post(
      ACTIVATE_ENDPOINT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(
      () => {
        dispatch(setMessage(USER_ACTIVATED));
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const changePassword = (
  dispatch: AppDispatch,
  token: string,
  password: string
) =>
  axiosApiInstance
    .post(
      CHANGE_PASSWORD_ENDPOINT,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(
      () => {
        dispatch(setMessage(PASSWORD_CHANGED));
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const updatePassword = (dispatch: AppDispatch, password: string) =>
  axiosApiInstance.post(CHANGE_PASSWORD_ENDPOINT, { password }).then(
    () => {
      dispatch(setMessage(PASSWORD_UPDATED));
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updateUser = (dispatch: AppDispatch, user: UserData) =>
  axiosApiInstance.post(UPDATE_ENDPOINT, { userData: user }).then(
    () => {
      dispatch(setMessage(USER_UPDATED));
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const passwordRecovery = (dispatch: AppDispatch, email: string) =>
  axiosApiInstance.post(RECOVER_PASSWORD_ENDPOINT, { email }).then(
    () => {
      dispatch(setMessage(EMAIL_SENT));
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const getUserInfo = (dispatch: AppDispatch) =>
  axiosApiInstance.get(GET_USER_INFO_ENDPOINT).then(
    (res) => {
      const { email, username, firstname, lastname } = res.data.user;
      const user: UserState = {
        email,
        username,
        firstname,
        lastname,
      };
      dispatch(setUser(user));
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

export const useUser = () => useAppSelector((state: RootState) => state.user);

export const useUserActions = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMemo(
    () => ({
      activateUser: (token: string) => activateUser(dispatch, token),
      passwordRecovery: (email: string) => passwordRecovery(dispatch, email),
      changePassword: (token: string, password: string) =>
        changePassword(dispatch, token, password),
      updatePassword: (password: string) => updatePassword(dispatch, password),
      updateUser: (user: UserData) => updateUser(dispatch, user),
      signup: (data: SignupData) => signup(dispatch, navigate, data),
      getUserInfo: () => getUserInfo(dispatch),
    }),
    [dispatch, navigate]
  );
};
