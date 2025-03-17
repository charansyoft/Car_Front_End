import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const UserFP = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#121212", width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Home Link */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "#FFD700", textDecoration: "none", cursor: "pointer" }}
        >
          Home
        </Typography>

        {/* Username Display */}
        {user && (
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {user.name}
          </Typography>
        )}

        <Button
          component={Link}
          to="/Bookings"
          sx={{
            backgroundColor: "#1565C0", // Deep blue for strong contrast
            color: "white", // White text for readability
            fontWeight: "bold", // Makes text stand out
            padding: "8px 16px", // Adds proper spacing
            borderRadius: "8px", // Smooth rounded corners
            "&:hover": { backgroundColor: "#0D47A1", color: "white" }, // Darker blue on hover
          }}
        >
          Booking
        </Button>

        {/* Logout Button */}
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserFP;
