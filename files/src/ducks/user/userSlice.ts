import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
}

const initialState: UserState = {
  email: "",
  username: "",
  firstname: "",
  lastname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
    clearUser: (state) => {
      state.email = initialState.email;
      state.username = initialState.username;
      state.firstname = initialState.firstname;
      state.lastname = initialState.lastname;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
