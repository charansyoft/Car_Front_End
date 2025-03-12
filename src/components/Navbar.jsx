import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // Import logout action

function Navbar({ scrollToContact, scrollToAbout }) {
  const location = useLocation(); // Get current route
  const { isAuthenticated, username } = useSelector((state) => state.auth); // Get auth state from Redux
  const dispatch = useDispatch();

  // Check if the user is on the login or signup page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return ( 
    <AppBar sx={{ width: "100%", background: "#121212", padding: "10px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{ color: "#FFD700", textDecoration: "none", cursor: "pointer" }}
        >
          Home
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {location.pathname === "/userFrontPage" ? (
            isAuthenticated && (
              <>
                <Typography sx={{ color: "#FFD700", fontWeight: "bold", mt: 1 }}>
                  {username}
                </Typography>
                
              </>
            )
          ) : (
            <>
            <Button component={Link} to="/products" sx={{ color: "#fff" }}>
            Products
          </Button>
              {/* Hide About Us & Contact Us if on login/signup pages */}
              {!isAuthPage && (
                <>
                  <Button onClick={scrollToAbout} sx={{ color: "#fff" }}>
                    About Us
                  </Button>
                  <Button onClick={scrollToContact} sx={{ color: "#fff" }}>
                    Contact Us
                  </Button>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    sx={{
                      backgroundColor: "#FFD700",
                      color: "#121212",
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {isAuthenticated && (
                <>
                  <Typography sx={{ color: "#FFD700", fontWeight: "bold", mt: 1 }}>
                    {username}
                  </Typography>
                  
                </>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
