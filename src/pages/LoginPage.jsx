import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      // Send the login request to the backend
      const response = await axios.post("http://localhost:5000/api/login", userData);
      
      // If login is successful, display the message and redirect to the UserFrontPage
      setStatus(response.data.message); // Display the "Hi" message from backend
      setUsername("");
      setPassword("");

      // Redirect to user front page
      navigate("/userFrontPage");
    } catch (err) {
      // If there’s an error, set the status message to "Login failed"
      setStatus("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 14, mb: 4 }}>
      <Typography variant="h4" align="center">
        Login
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
          label="Password"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </form>

      {status && (
        <Typography
          variant="body1"
          align="center"
          sx={{ mt: 2, color: status.includes("Hi") ? "green" : "red" }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
}

export default LoginPage;
