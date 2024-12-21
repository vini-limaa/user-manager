import {
  setTheme as setThemeReducer,
  toggleTheme as setToggleTheme,
} from "@/store/theme/themeSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { ThemeState } from "@/store/theme/types";

const useTheme = () => {
  const themeState = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const setTheme = async ({ mode }: ThemeState) => {
    return dispatch(setThemeReducer(mode));
  };

  const toggleTheme = async () => {
    return dispatch(setToggleTheme());
  };

  return {
    themeState,
    setTheme,
    toggleTheme,
  };
};

export default useTheme;
