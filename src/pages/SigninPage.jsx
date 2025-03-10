import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setStatus("Passwords do not match!");
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      // Send data to the backend for user registration
      const response = await axios.post("http://localhost:5000/api/signup", userData);
      setStatus("Sign-Up successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setStatus("Failed to sign up. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mb: 4, mt: 14 }}>
      <Typography variant="h4" align="center">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          fullWidth
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" fullWidth>
          Sign Up
        </Button>
      </form>

      {status && (
        <Typography
          variant="body1"
          align="center"
          sx={{
            mt: 2,
            color: status.includes("successful") ? "green" : "red",
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
}

export default SignUpPage;
