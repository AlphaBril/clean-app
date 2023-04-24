import axios from "axios";
import { AuthState, refresh } from "src/ducks/auth/authSlice";
import { store } from "src/store/configure";

const REFRESH_ENDPOINT = "auth/refresh";

const axiosApiInstance = axios.create({
  baseURL: "http://localhost:3001/api",
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    config.withCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      try {
        const rs = await axiosApiInstance.get(REFRESH_ENDPOINT);
        const { accessToken } = rs.data;
        const { dispatch } = store;
        const user: AuthState = {
          isAuthenticated: true,
          accessToken,
        };
        dispatch(refresh(user));
        originalRequest._retry = true;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosApiInstance(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
