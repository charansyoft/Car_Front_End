import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Navbar({ scrollToContact, scrollToAbout }) {
  const location = useLocation(); // Get current route

  // Hide "About Us" and "Contact Us" on Login & Signup pages
  const hideButtons = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <AppBar sx={{ width: "100%", background: "#121212", padding: "10px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "#FFD700", textDecoration: "none" }}>
          Home
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {!hideButtons && (
            <>
              <Button onClick={scrollToAbout} sx={{ color: "#fff" }}>
                About Us
              </Button>
              <Button onClick={scrollToContact} sx={{ color: "#fff" }}>
                Contact Us
              </Button>
            </>
          )}
          <Button component={Link} to="/login" sx={{ color: "#fff" }}>
            Login
          </Button>
          <Button component={Link} to="/signup" sx={{ backgroundColor: "#FFD700", color: "#121212", fontWeight: "bold" }}>
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
