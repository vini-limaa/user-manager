import React from "react";
import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAuth, useTheme } from "@/hooks";
import styles from "./Topbar.module.scss";

const TopBar: React.FC = () => {
  const { themeState, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const themeMode = themeState.mode;

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleTheme()}
          aria-label="Toggle theme"
        >
          {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <Box className={styles.rightSection}>
          <Button
            variant="contained"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
