import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import auth from "src/ducks/auth/authSlice";
import user from "src/ducks/user/userSlice";
import message from "src/ducks/message/messageSlice";

export const store = configureStore({
  reducer: {
    auth: auth,
    user: user,
    message: message,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
