import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { RootState } from "src/store/configure";
import {
  setMessage,
  clearMessage,
  MessageState,
} from "src/ducks/message/messageSlice";

export const USER_REGISTRATED: MessageState = {
  value: "Registration successfull, you need to validate your mail",
  status: "success",
};
export const USER_ACTIVATED: MessageState = {
  value: "Your account is now activated, please log in",
  status: "warning",
};
export const PASSWORD_CHANGED: MessageState = {
  value: "Your password was updated, please log in",
  status: "warning",
};
export const USER_UPDATED: MessageState = {
  value: "User info updated",
  status: "warning",
};
export const PASSWORD_UPDATED: MessageState = {
  value: "Your password was updated",
  status: "warning",
};
export const EMAIL_SENT: MessageState = {
  value: "An email has been sent",
  status: "success",
};
export const TOKEN_EXPIRED: MessageState = {
  value: "Your session is expired, please login",
  status: "error",
};

export const useMessage = () =>
  useAppSelector((state: RootState) => state.message);

export const useMessageActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      clearMessage: () => dispatch(clearMessage()),
      setMessage: (message: MessageState) => dispatch(setMessage(message)),
    }),
    [dispatch]
  );
};
