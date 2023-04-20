import { useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import {
  loginSuccess,
  loginFailure,
  logOut,
  AuthenticationState,
} from "src/ducks/auth/authSlice";
import { MessageState, setMessage } from "src/ducks/message/messageSlice";
import axios, { AxiosError, AxiosResponse } from "axios";

import { socket } from "src/hooks/useSocket";
import { AppDispatch, RootState } from "src/store/configure";

const PORT = 3001;
const ADDRESS = "localhost";
const PROTOCOL = "http";
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const LOGIN_ENDPOINT = "/api/auth/login";
const REFRESH_ENDPOINT = "/api/auth/refresh";
const LOGOUT_ENDPOINT = "/api/auth/logout";

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
  const token = res.data.accessToken;
  const user: AuthenticationState = {
    isAuthenticated: true,
    accessToken: token,
  };
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
  axios
    .post(
      `${API_URL}${LOGIN_ENDPOINT}`,
      { username, password },
      {
        withCredentials: true,
      }
    )
    .then(
      (res) => {
        setUser(dispatch, res, navigate);
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const logout = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  accessToken: string
) =>
  axios
    .post(
      `${API_URL}${LOGOUT_ENDPOINT}`,
      {},
      {
        headers: {
          Authorization: accessToken,
        },
        withCredentials: true,
      }
    )
    .then(
      (res) => {
        if (res.status) dispatch(logOut());
        navigate("/auth/login");
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const refresh = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  accessToken: string
) =>
  axios
    .get(`${API_URL}${REFRESH_ENDPOINT}`, {
      headers: {
        Authorization: accessToken,
      },
      withCredentials: true,
    })
    .then(
      (res) => {
        setUser(dispatch, res, navigate);
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

export const useAuth = () => useAppSelector((state: RootState) => state.auth);

export const useAuthActions = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  return useMemo(
    () => ({
      login: (username: string, password: string) =>
        login(dispatch, navigate, username, password),
      refresh: () => refresh(dispatch, navigate, accessToken),
      logout: () => logout(dispatch, navigate, accessToken),
    }),
    [dispatch, navigate]
  );
};
