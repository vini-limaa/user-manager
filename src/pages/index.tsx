import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link as MUILink,
} from "@mui/material";
import Link from "next/link";
import styles from "@/styles/styles.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn, authState } = useAuth();
  const { isAuthenticated, isLoading } = authState;
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
      return;
    }
    setLoaded(true);
  }, [isLoading, isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  };

  if (!loaded) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Welcome"
          className={styles.image}
        />
      </Box>
      <Box className={styles.formContainer}>
        <Box component="form" onSubmit={handleLogin} className={styles.form}>
          <Typography variant="h4" className={styles.title}>
            Welcome Back
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Log in to your account to continue
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.button}
          >
            LOG IN
          </Button>

          <Typography variant="body2" className={styles.getAccount}>
            Don’t have an account?{" "}
            <Link href="/register" passHref>
              <MUILink className={styles.link}>Sign Up</MUILink>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
