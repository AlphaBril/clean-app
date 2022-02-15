const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationType {
  isAuthenticated: boolean;
  user: string;
}

const initialState: AuthenticationType = {
  isAuthenticated: false,
  user: "",
};

export const authSlice = createSlice({
  name: "authetication",
  initialState,
  reducers: {
    auth: (state, action: PayloadAction<AuthenticationType>) => {
      const { type, payload } = action;

      switch (type) {
        case LOGIN_SUCCESS:
          state.isAuthenticated = true;
          state.user = payload.user;
          return state;
        case LOGIN_FAILURE:
          state.isAuthenticated = initialState.isAuthenticated;
          state.user = initialState.user;
          return state;
        case LOGOUT:
          state.isAuthenticated = initialState.isAuthenticated;
          state.user = initialState.user;
          return state;
        default:
          return state;
      }
    },
  },
});

export default authSlice.reducer;
