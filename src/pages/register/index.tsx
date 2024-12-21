import { useState } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import styles from "./register.module.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    alert(`Form Data: ${JSON.stringify(formData)}`);
  };

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box className={styles.imageContainer}>
        <img
          src="https://images.unsplash.com/photo-1556741533-411cf82e4e2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Welcome"
          className={styles.image}
        />
      </Box>
      <Box className={styles.formContainer}>
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <Typography variant="h4" className={styles.title}>
            Create Your Account
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            Fill out the fields below to register
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Name"
            id="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <TextField
            label="Email"
            id="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <TextField
            label="Password"
            id="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <TextField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
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
            Register
          </Button>
          <Typography variant="body2" className={styles.getAccount}>
            Already have an account?{" "}
            <Link href="/" className={styles.link}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
