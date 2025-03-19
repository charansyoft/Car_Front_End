import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import EventNoteIcon from "@mui/icons-material/EventNote"; // Bookings Icon
import FavoriteIcon from "@mui/icons-material/Favorite"; // Liked Icon

const UserFrontPageNavbar = () => {
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
    navigate("/Login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#1A1A2E",
        boxShadow: 4,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
        {/* Left Section - Home Icon */}
        <IconButton
          component={Link}
          to="/UserFrontPage"
          sx={{ color: "#F5A623", "&:hover": { color: "#FFC75F" } }}
        >
          <HomeIcon fontSize="large" />
        </IconButton>

        {/* Middle Section - Username */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {user && (
            <Typography
              variant="h6"
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                letterSpacing: 1,
                textTransform: "capitalize",
              }}
            >
              {user.name}
            </Typography>
          )}
        </Box>

        {/* Right Section - Liked, Cart & Logout */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* ✅ "Liked" button (ALWAYS visible EXCEPT for Admin) */}
          {user?.email !== "Admin123@gmail.com" && (
            <IconButton
              onClick={() => navigate("/UserLikedProducts")}
              sx={{ color: "#E91E63", "&:hover": { color: "#FF4081" } }}
            >
              <FavoriteIcon fontSize="large" />
            </IconButton>
          )}

          {/* ✅ "Bookings" button (ONLY visible for non-admin users) */}
          {user?.email !== "Admin123@gmail.com" && (
            <IconButton
              onClick={() => navigate("/UserBookings")}
              sx={{ color: "#4CAF50", "&:hover": { color: "#66BB6A" } }}
            >
              <EventNoteIcon fontSize="large" />
            </IconButton>
          )}

          {/* Logout Icon */}
          <IconButton
            onClick={handleLogout}
            sx={{ color: "#E53935", "&:hover": { color: "#D32F2F" } }}
          >
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UserFrontPageNavbar;
