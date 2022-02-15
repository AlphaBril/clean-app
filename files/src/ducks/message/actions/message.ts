import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "src/store/configure";
import { setMessage, clearMessage, MessageState } from "../messageSlice";

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
