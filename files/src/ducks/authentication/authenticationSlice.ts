import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  isAuthenticated: boolean;
  user: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  user: "",
};

export const authSlice = createSlice({
  name: "authetication",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthenticationState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    loginFailure: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
    },
    loginOut: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
    },
  },
});

export const { loginSuccess, loginFailure, loginOut } = authSlice.actions;
export default authSlice.reducer;
