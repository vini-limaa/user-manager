import { Typography } from "@mui/material";
import styles from "./Header.module.scss";

const DashboardHeader = () => (
  <header className={styles.header}>
    <Typography variant="h4">User Management Dashboard</Typography>
  </header>
);

export default DashboardHeader;
