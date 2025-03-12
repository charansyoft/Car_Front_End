import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ scrollToContact, scrollToAbout }) {
  const location = useLocation(); // Get current route
  const { isAuthenticated, username } = useSelector((state) => state.auth); // Get auth state from Redux

  // Check current routes
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
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
          {isAuthPage ? (
            // Show only Home, Login, and Signup on Auth Pages
            <>
              <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{ backgroundColor: "#FFD700", color: "#121212", fontWeight: "bold" }}
              >
                Sign Up
              </Button>
            </>
          ) : isUserFrontPage ? (
            // Show only Home on User Front Page
            <>
              <Button component={Link} to="/" sx={{ color: "#fff" }}>
                Home
              </Button>
            </>
          ) : isProductsPage || isAddProductsPage || isViewProductsPage || isBookingsPage ? (
            // Show only Home, Products, and Booking on Products, AddProducts, ViewProducts, and Bookings Pages
            <>
              <Button component={Link} to="/Products" sx={{ color: "#fff" }}>
                Products
              </Button>
              <Button component={Link} to="/Bookings" sx={{ color: "#fff" }}>
                Booking
              </Button>
            </>
          ) : (
            // Default: Show Home, Products, About Us, Contact Us, and login/signup options
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

              {!isAuthenticated ? (
                <>
                  <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    sx={{ backgroundColor: "#FFD700", color: "#121212", fontWeight: "bold" }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Typography sx={{ color: "#FFD700", fontWeight: "bold", mt: 1 }}>
                  {username}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
