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

const PORT = 3001;
const ADDRESS = "localhost";
const PROTOCOL = "http";
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const LOGIN_ENDPOINT = "/api/auth/login";
const SIGNUP_ENDPOINT = "/api/auth/signup";
const ACTIVATE_ENDPOINT = "/api/auth/activate";
const CHANGE_PASSWORD_ENDPOINT = "/api/auth/password";
const UPDATE_EMAIL_ENDPOINT = "/api/auth/email";
const UPDATE_USERNAME_ENDPOINT = "/api/auth/username";
const UPDATE_SURNAME_ENDPOINT = "/api/auth/surname";
const UPDATE_NAME_ENDPOINT = "/api/auth/name";
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

const userRegistrated = (dispatch: AppDispatch, navigate: NavigateFunction) => {
  const message: MessageState = {
    value: "Registration success, you need to validate your mail",
    status: "success",
  };
  dispatch(setMessage(message));
  navigate("/auth/login");
};

const userActivated = (dispatch: AppDispatch) => {
  const message: MessageState = {
    value: "Your account is now activated, please log in",
    status: "warning",
  };
  dispatch(setMessage(message));
};

const passwordChanged = (dispatch: AppDispatch) => {
  const message: MessageState = {
    value: "Your password was updated, please log in",
    status: "warning",
  };
  dispatch(setMessage(message));
};

const emailChanged = (dispatch: AppDispatch) => {
  const message: MessageState = {
    value: "Your email was updated",
    status: "warning",
  };
  dispatch(setMessage(message));
};

const usernameChanged = (dispatch: AppDispatch) => {
  const message: MessageState = {
    value: "Your username was updated",
    status: "warning",
  };
  dispatch(setMessage(message));
};

const surnameChanged = (dispatch: AppDispatch) => {
  const message: MessageState = {
    value: "Your surname was updated",
    status: "warning",
  };
  dispatch(setMessage(message));
};

const nameChanged = (dispatch: AppDispatch) => {
  const message: MessageState = {
    value: "Your name was updated",
    status: "warning",
  };
  dispatch(setMessage(message));
};

const passswordChanged = (dispatch: AppDispatch) => {
  const message: MessageState = {
    value: "Your password was updated",
    status: "warning",
  };
  dispatch(setMessage(message));
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
  { email, username, password, name, surname }: SignupData
) =>
  axios
    .post(`${API_URL}${SIGNUP_ENDPOINT}`, {
      email,
      username,
      password,
      name,
      surname,
    })
    .then(
      () => {
        userRegistrated(dispatch, navigate);
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const activateUser = (dispatch: AppDispatch, token: string) =>
  axios.post(`${API_URL}${ACTIVATE_ENDPOINT}`, { token }).then(
    () => {
      userActivated(dispatch);
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
  axios.post(`${API_URL}${CHANGE_PASSWORD_ENDPOINT}`, { token, password }).then(
    () => {
      passwordChanged(dispatch);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updatePassword = (
  dispatch: AppDispatch,
  token: string | null,
  password: string
) =>
  axios.post(`${API_URL}${CHANGE_PASSWORD_ENDPOINT}`, { token, password }).then(
    () => {
      passswordChanged(dispatch);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updateEmail = (
  dispatch: AppDispatch,
  token: string | null,
  email: string
) =>
  axios.post(`${API_URL}${UPDATE_EMAIL_ENDPOINT}`, { token, email }).then(
    () => {
      emailChanged(dispatch);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updateUsername = (
  dispatch: AppDispatch,
  token: string | null,
  username: string
) =>
  axios.post(`${API_URL}${UPDATE_USERNAME_ENDPOINT}`, { token, username }).then(
    () => {
      usernameChanged(dispatch);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updateSurname = (
  dispatch: AppDispatch,
  token: string | null,
  surname: string
) =>
  axios.post(`${API_URL}${UPDATE_SURNAME_ENDPOINT}`, { token, surname }).then(
    () => {
      surnameChanged(dispatch);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updateName = (
  dispatch: AppDispatch,
  token: string | null,
  name: string
) =>
  axios.post(`${API_URL}${UPDATE_NAME_ENDPOINT}`, { token, name }).then(
    () => {
      nameChanged(dispatch);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const emailSent = (dispatch: AppDispatch) => {
  const message: MessageState = {
    value: "An email has been sent",
    status: "success",
  };
  dispatch(setMessage(message));
};

const passwordRecovery = (dispatch: AppDispatch, email: string) =>
  axios.post(`${API_URL}${RECOVER_PASSWORD_ENDPOINT}`, { email }).then(
    () => {
      emailSent(dispatch);
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
      updatePassword: (token: string | null, password: string) =>
        updatePassword(dispatch, token, password),
      updateEmail: (token: string | null, email: string) =>
        updateEmail(dispatch, token, email),
      updateUsername: (token: string | null, username: string) =>
        updateUsername(dispatch, token, username),
      updateSurname: (token: string | null, surname: string) =>
        updateSurname(dispatch, token, surname),
      updateName: (token: string | null, name: string) =>
        updateName(dispatch, token, name),
      login: (username: string, password: string) =>
        login(dispatch, navigate, username, password),
      signup: (data: SignupData) => signup(dispatch, navigate, data),
      logout: () => logout(dispatch, navigate),
    }),
    [dispatch, navigate]
  );
};
