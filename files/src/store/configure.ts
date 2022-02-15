import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authentication from "src/ducks/authentication/authenticationSlice";
import message from "src/ducks/message/messageSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authentication,
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
