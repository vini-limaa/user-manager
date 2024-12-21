import { Box, Typography, Button } from "@mui/material";
import styles from "./Toolbar.module.scss";

const Toolbar = ({ onCreate }: { onCreate: () => void }) => (
  <Box className={styles.toolbar}>
    <Typography variant="h6" className={styles.title}>
      Users
    </Typography>
    <Button
      variant="contained"
      color="success"
      className={styles.createUserButton}
      onClick={onCreate}
    >
      + Create User
    </Button>
  </Box>
);

export default Toolbar;
