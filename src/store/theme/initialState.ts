import { ThemeState, ThemeMode } from "./types";

const initialState: ThemeState = {
  mode:
    ((typeof window !== "undefined" &&
      localStorage.getItem("theme")) as ThemeMode) || "light",
};

export default initialState;
