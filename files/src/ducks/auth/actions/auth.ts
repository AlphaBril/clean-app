import { useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { logIn, logOut, AuthState } from "src/ducks/auth/authSlice";
import { MessageState, setMessage } from "src/ducks/message/messageSlice";
import { AxiosError } from "axios";
import axiosApiInstance from "src/utils/axios/axios";

import { AppDispatch, RootState } from "src/store/configure";

const LOGIN_ENDPOINT = "auth/login";
const LOGOUT_ENDPOINT = "auth/logout";

const handleError = (dispatch: AppDispatch, error: AxiosError) => {
  const data = error.response?.data as { [key: string]: unknown };
  let errorMessage = "An error occured";
  if (data && typeof data === "object" && data.message) {
    errorMessage = JSON.stringify(data.message);
  }
  const message: MessageState = { value: errorMessage, status: "error" };
  dispatch(setMessage(message));
};

const login = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  username: string,
  password: string
) =>
  axiosApiInstance.post(LOGIN_ENDPOINT, { username, password }).then(
    (res) => {
      const { accessToken } = res.data;
      const user: AuthState = {
        isAuthenticated: true,
        accessToken,
      };
      dispatch(logIn(user));
      navigate("/");
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const logout = (dispatch: AppDispatch, navigate: NavigateFunction) =>
  axiosApiInstance.post(LOGOUT_ENDPOINT).then(
    () => {
      dispatch(logOut());
      navigate("/auth/login");
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

export const useAuth = () => useAppSelector((state: RootState) => state.auth);

export const useAuthActions = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMemo(
    () => ({
      login: (username: string, password: string) =>
        login(dispatch, navigate, username, password),
      logout: () => logout(dispatch, navigate),
    }),
    [dispatch, navigate]
  );
};
