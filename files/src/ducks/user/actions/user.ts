import { useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/hooks";
import { MessageState, setMessage } from "src/ducks/message/messageSlice";
import axios, { AxiosError } from "axios";

import { SignupData } from "src/components/Auth/components/Signup/Signup.d";
import { UserData } from "./user.d";
import { AppDispatch } from "src/store/configure";
import {
  EMAIL_SENT,
  PASSWORD_CHANGED,
  PASSWORD_UPDATED,
  USER_ACTIVATED,
  USER_REGISTRATED,
  USER_UPDATED,
} from "src/ducks/message/actions/message";

const PORT = 3001;
const ADDRESS = "localhost";
const PROTOCOL = "http";
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const SIGNUP_ENDPOINT = "/api/user/signup";
const ACTIVATE_ENDPOINT = "/api/user/activate";
const CHANGE_PASSWORD_ENDPOINT = "/api/user/password";
const UPDATE_ENDPOINT = "/api/user/update";
const RECOVER_PASSWORD_ENDPOINT = "/api/user/recovery";

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
  axios
    .post(`${API_URL}${SIGNUP_ENDPOINT}`, {
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
  axios
    .post(
      `${API_URL}${ACTIVATE_ENDPOINT}`,
      {},
      {
        headers: {
          Authorization: token,
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
  axios
    .post(
      `${API_URL}${CHANGE_PASSWORD_ENDPOINT}`,
      { password },
      {
        headers: {
          Authorization: token,
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
  axios
    .post(
      `${API_URL}${CHANGE_PASSWORD_ENDPOINT}`,
      { password },
      {
        headers: {
          Authorization: sessionStorage.getItem("user"),
        },
      }
    )
    .then(
      () => {
        dispatch(setMessage(PASSWORD_UPDATED));
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const updateUser = (dispatch: AppDispatch, user: UserData) =>
  axios
    .post(
      `${API_URL}${UPDATE_ENDPOINT}`,
      { userData: user },
      {
        headers: {
          Authorization: sessionStorage.getItem("user"),
        },
      }
    )
    .then(
      () => {
        dispatch(setMessage(USER_UPDATED));
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const passwordRecovery = (dispatch: AppDispatch, email: string) =>
  axios.post(`${API_URL}${RECOVER_PASSWORD_ENDPOINT}`, { email }).then(
    () => {
      dispatch(setMessage(EMAIL_SENT));
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

export const useUser = () => {
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
    }),
    [dispatch, navigate]
  );
};
