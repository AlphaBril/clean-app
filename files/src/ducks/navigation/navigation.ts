import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      pushState: (path: string) => navigate(path),
    }),
    [navigate]
  );
};
