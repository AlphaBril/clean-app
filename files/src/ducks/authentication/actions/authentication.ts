import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { push as pushState } from "connected-react-router";
import axios from "axios";

import { SignupData } from "src/components/Auth/components/Signup/Signup.d";
import { socket } from "src/hooks/useSocket";

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

const handleError = (dispatch: any, error: any) => {
  const message = error.response.data.message || error.response.data.errno;
  dispatch({ type: "LOGIN_FAILURE" });
  dispatch({ type: "ERROR_MESSAGE", payload: message });
};

const setUser = (dispatch: any, res: any) => {
  const token = res.data.token;
  localStorage.setItem("user", token);
  dispatch({ type: "LOGIN_SUCCESS", payload: token });
  socket.emit("order:update", token);
  dispatch(pushState("/"));
};

const userRegistrated = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Registration success, you need to validate your mail",
  });
  dispatch(pushState("/auth/login"));
};

const userActivated = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your account is now activated, please log in",
  });
};

const passwordChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your password was updated, please log in",
  });
};

const emailSent = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "An email has been sent",
  });
};

const emailChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your email was updated",
  });
};

const usernameChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your username was updated",
  });
};

const surnameChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your surname was updated",
  });
};

const nameChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your name was updated",
  });
};

const passswordChanged = (dispatch: any, res: any) => {
  dispatch({
    type: "SET_MESSAGE",
    payload: "Your password was updated",
  });
};

const login = (username: string, password: string) => (dispatch: any) =>
  axios.post(`${API_URL}${LOGIN_ENDPOINT}`, { username, password }).then(
    (res) => {
      setUser(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const logout = () => (dispatch: any) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("user");
  dispatch(pushState("/"));
};

const signup =
  ({ email, username, password, name, surname }: SignupData) =>
  (dispatch: any) =>
    axios
      .post(`${API_URL}${SIGNUP_ENDPOINT}`, {
        email,
        username,
        password,
        name,
        surname,
      })
      .then(
        (res) => {
          userRegistrated(dispatch, res);
        },
        (error) => {
          handleError(dispatch, error);
        }
      );

const activateUser = (token: string) => (dispatch: any) =>
  axios.post(`${API_URL}${ACTIVATE_ENDPOINT}`, { token }).then(
    (res) => {
      userActivated(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const changePassword = (token: string, password: string) => (dispatch: any) =>
  axios.post(`${API_URL}${CHANGE_PASSWORD_ENDPOINT}`, { token, password }).then(
    (res) => {
      passwordChanged(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updatePassword =
  (token: string | null, password: string) => (dispatch: any) =>
    axios
      .post(`${API_URL}${CHANGE_PASSWORD_ENDPOINT}`, { token, password })
      .then(
        (res) => {
          passswordChanged(dispatch, res);
        },
        (error) => {
          handleError(dispatch, error);
        }
      );

const updateEmail = (token: string | null, email: string) => (dispatch: any) =>
  axios.post(`${API_URL}${UPDATE_EMAIL_ENDPOINT}`, { token, email }).then(
    (res) => {
      emailChanged(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const updateUsername =
  (token: string | null, username: string) => (dispatch: any) =>
    axios
      .post(`${API_URL}${UPDATE_USERNAME_ENDPOINT}`, { token, username })
      .then(
        (res) => {
          usernameChanged(dispatch, res);
        },
        (error) => {
          handleError(dispatch, error);
        }
      );

const updateSurname =
  (token: string | null, surname: string) => (dispatch: any) =>
    axios.post(`${API_URL}${UPDATE_SURNAME_ENDPOINT}`, { token, surname }).then(
      (res) => {
        surnameChanged(dispatch, res);
      },
      (error) => {
        handleError(dispatch, error);
      }
    );

const updateName = (token: string | null, name: string) => (dispatch: any) =>
  axios.post(`${API_URL}${UPDATE_NAME_ENDPOINT}`, { token, name }).then(
    (res) => {
      nameChanged(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

const passwordRecovery = (email: string) => (dispatch: any) =>
  axios.post(`${API_URL}${RECOVER_PASSWORD_ENDPOINT}`, { email }).then(
    (res) => {
      emailSent(dispatch, res);
    },
    (error) => {
      handleError(dispatch, error);
    }
  );

export const useAuthentication = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      activateUser: (token: string) => dispatch(activateUser(token)),
      passwordRecovery: (email: string) => dispatch(passwordRecovery(email)),
      changePassword: (token: string, password: string) =>
        dispatch(changePassword(token, password)),
      updatePassword: (token: string | null, password: string) =>
        dispatch(updatePassword(token, password)),
      updateEmail: (token: string | null, email: string) =>
        dispatch(updateEmail(token, email)),
      updateUsername: (token: string | null, username: string) =>
        dispatch(updateUsername(token, username)),
      updateSurname: (token: string | null, surname: string) =>
        dispatch(updateSurname(token, surname)),
      updateName: (token: string | null, name: string) =>
        dispatch(updateName(token, name)),
      login: (username: string, password: string) =>
        dispatch(login(username, password)),
      signup: (data: SignupData) => dispatch(signup(data)),
      logout: () => dispatch(logout()),
    }),
    [dispatch]
  );
};
