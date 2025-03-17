import { Instagram, WhatsApp, YouTube } from "@mui/icons-material";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        py: 3,
        width: "100%",
        bottom: 0,
        left: 0,
        
      }}
    >
      <Container >
        <Typography variant="body1">
          Address: Miyapur, Hyderabad, Telangana
        </Typography>
        <Box mt={2}>
          <IconButton component={Link} to="#" sx={{ color: "#fff" }}>
            <Instagram />
          </IconButton>
          <IconButton component={Link} to="#" sx={{ color: "#fff" }}>
            <WhatsApp />
          </IconButton>
          <IconButton component={Link} to="#" sx={{ color: "#fff" }}>
            <YouTube />
          </IconButton>
        </Box>
        <Typography variant="body2" mt={2}>
          &copy; {new Date().getFullYear()} Carrental. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
