import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  isAuthenticated: boolean;
  accessToken: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthenticationState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
    },
    loginFailure: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.accessToken = initialState.accessToken;
    },
    logOut: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.accessToken = initialState.accessToken;
    },
  },
});

export const { loginSuccess, loginFailure, logOut } = authSlice.actions;
export default authSlice.reducer;
