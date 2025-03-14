import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Navbar({ scrollToContact, scrollToAbout }) {
  const location = useLocation(); // Get current route

  // Check current routes
  const isUserFrontPage = location.pathname === "/userFrontPage";
  const isProductsPage = location.pathname === "/Products";
  const isAddProductsPage = location.pathname === "/AddProducts";
  const isViewProductsPage = location.pathname === "/ViewProducts";
  const isBookingsPage = location.pathname === "/Bookings"; // Check if on the Bookings page

  return (
    <AppBar sx={{ width: "100%", background: "#121212", padding: "10px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Home Button */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{ color: "#FFD700", textDecoration: "none", cursor: "pointer" }}
        >
          Home
        </Typography>

        {/* Conditional Navigation */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {isUserFrontPage ? (
            <Button component={Link} to="/" sx={{ color: "#fff" }}>
              Home
            </Button>
          ) : isProductsPage || isAddProductsPage || isViewProductsPage || isBookingsPage ? (
            <>
              <Button component={Link} to="/Products" sx={{ color: "#fff" }}>
                Products
              </Button>
              <Button component={Link} to="/Bookings" sx={{ color: "#fff" }}>
                Booking
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/Products" sx={{ color: "#fff" }}>
                Products
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
        <Box sx={{ display: "flex", gap: 2 }}>
  <Button component={Link} to="/Login" sx={{ color: "#fff" }}>
    Login
  </Button>
  <Button component={Link} to="/SignUp" sx={{ color: "#fff" }}>
    Sign Up
  </Button>
</Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
