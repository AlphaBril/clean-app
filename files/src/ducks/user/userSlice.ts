import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isAuthenticated: boolean;
  user: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSuccess: (state, action: PayloadAction<UserState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    userFailure: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
    },
    userOut: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
    },
  },
});

export const { userSuccess, userFailure, userOut } = userSlice.actions;
export default userSlice.reducer;
