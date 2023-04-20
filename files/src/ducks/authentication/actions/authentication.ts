import { useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/hooks";
import {
  loginSuccess,
  loginFailure,
  loginOut,
  AuthenticationState,
} from "src/ducks/authentication/authenticationSlice";
import { MessageState, setMessage } from "src/ducks/message/messageSlice";
import axios, { AxiosError, AxiosResponse } from "axios";

import { SignupData } from "src/components/Auth/components/Signup/Signup.d";
import { socket } from "src/hooks/useSocket";
import { AppDispatch } from "src/store/configure";
import { UserData } from "./user.d";
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
const LOGIN_ENDPOINT = "/api/auth/login";
const SIGNUP_ENDPOINT = "/api/auth/signup";
const ACTIVATE_ENDPOINT = "/api/auth/activate";
const CHANGE_PASSWORD_ENDPOINT = "/api/auth/password";
const UPDATE_ENDPOINT = "/api/auth/update";
const RECOVER_PASSWORD_ENDPOINT = "/api/auth/recovery";

const handleError = (dispatch: AppDispatch, error: AxiosError) => {
  const data = error.response?.data as { [key: string]: unknown };
  let errorMessage = "An error occured";
  if (data && typeof data === "object" && data.message) {
    errorMessage = JSON.stringify(data.message);
  }
  const message: MessageState = { value: errorMessage, status: "error" };
  dispatch(loginFailure());
  dispatch(setMessage(message));
};

const setUser = (
  dispatch: AppDispatch,
  res: AxiosResponse,
  navigate: NavigateFunction
) => {
  const token = res.data.token;
  localStorage.setItem("user", token);
  const user: AuthenticationState = { isAuthenticated: true, user: token };
  dispatch(loginSuccess(user));
  socket.emit("order:update", token);
  navigate("/");
};

const login = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  username: string,
  password: string
) =>
  axios.post(`${API_URL}${LOGIN_ENDPOINT}`, { username, password }).then(
    (res) => {
      setUser(dispatch, res, navigate);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const logout = (dispatch: AppDispatch, navigate: NavigateFunction) => {
  dispatch(loginOut());
  localStorage.removeItem("user");
  navigate("/");
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
    .post(`${API_URL}${ACTIVATE_ENDPOINT}`, {
      headers: {
        Authorization: token,
      },
    })
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
          Authorization: localStorage.getItem("user"),
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
    .post(`${API_URL}${UPDATE_ENDPOINT}`, user, {
      headers: {
        Authorization: localStorage.getItem("user"),
      },
    })
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

export const useAuthentication = () => {
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
      login: (username: string, password: string) =>
        login(dispatch, navigate, username, password),
      signup: (data: SignupData) => signup(dispatch, navigate, data),
      logout: () => logout(dispatch, navigate),
    }),
    [dispatch, navigate]
  );
};
