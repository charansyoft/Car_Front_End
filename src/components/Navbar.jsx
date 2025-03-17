import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Navbar({ scrollToContact, scrollToAbout }) {
  const location = useLocation();
  const isUserFrontPage = location.pathname === "/userFrontPage";
  const isProductsPage = location.pathname === "/Products";
  const isAddProductsPage = location.pathname === "/AddProducts";
  const isViewProductsPage = location.pathname === "/ViewProducts";
  const isBookingsPage = location.pathname === "/Bookings";
  const isLoginPage = location.pathname === "/Login";
  const isSignupPage = location.pathname === "/SignUp";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // Store user details
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <AppBar sx={{ width: "100%", background: "#121212", padding: "10px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Home Button */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "#FFD700", textDecoration: "none", cursor: "pointer" }}
        >
          Home
        </Typography>

        {/* Conditional Navigation */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {isUserFrontPage ? (
            // If on UserFrontPage → Show Only Home, Username, Logout
            <>
              <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                {user?.name}
              </Typography>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "#fff",
                  background: "#FF5733",
                  "&:hover": { background: "#D84315" },
                }}
              >
                Logout
              </Button>
            </>
          ) : isProductsPage || isAddProductsPage || isViewProductsPage || isBookingsPage ? (
            <>
              <Button component={Link} to="/Products" sx={{ color: "#fff" }}>
                Cars
              </Button>
              <Button component={Link} to="/Bookings" sx={{ color: "#fff" }}>
                Booking
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/Products" sx={{ color: "#fff" }}>
                Cars
              </Button>
              <Button onClick={scrollToAbout} sx={{ color: "#fff" }}>
                About Us
              </Button>
              <Button onClick={scrollToContact} sx={{ color: "#fff" }}>
                Contact Us
              </Button>
            </>
          )}
        </Box>

        {/* Login & Signup (Hidden on UserFrontPage) */}
        {!isUserFrontPage && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/Login" sx={{ color: "#fff" }}>
              Login
            </Button>
            <Button component={Link} to="/SignUp" sx={{ color: "#fff" }}>
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
