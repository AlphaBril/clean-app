import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/configure";
import { CLEAR_MESSAGE, ERROR_MESSAGE, SET_MESSAGE } from "../message";

const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message,
});

const setErrorMessage = (message: string) => ({
  type: ERROR_MESSAGE,
  payload: message,
});

const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const useMessage = () =>
  useSelector((state: RootState) => state.message);

export const useMessageActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      clearMessage: () => dispatch(clearMessage()),
      setMessage: (message: string) => dispatch(setMessage(message)),
      setErrorMessage: (message: string) => dispatch(setErrorMessage(message)),
    }),
    [dispatch]
  );
};
