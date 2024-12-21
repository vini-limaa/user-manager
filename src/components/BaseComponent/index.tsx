import { useTheme } from "@/hooks";
import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import TopBar from "../TopBar";
import { ThemeMode } from "@/store/theme/types";

const BaseComponent = ({ children }) => {
  const { themeState } = useTheme();

  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    setCurrentTheme(themeState.mode);
    document.documentElement.setAttribute("data-theme", themeState.mode);
  }, [themeState]);

  useEffect(() => {
    const themeSaved = localStorage.getItem("theme") as ThemeMode;
    if (themeSaved) {
      setCurrentTheme(themeSaved);
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      {children}
    </ThemeProvider>
  );
};

export default BaseComponent;
