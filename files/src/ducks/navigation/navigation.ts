import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const pushState = (path: string) => push(path);

export const useNavigation = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      pushState: (path: string) => dispatch(pushState(path)),
    }),
    [dispatch]
  );
};
