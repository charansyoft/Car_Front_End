import { Box, Typography, Grid } from "@mui/material";
import { forwardRef } from "react";

// ℹ️ **About Us Section**
const AboutUs = forwardRef((props, ref) => {  // ✅ Wrapped with forwardRef to accept `ref`
  return (
    <Box ref={ref} sx={{ my: 4, pt: "80px", mt: "-60px" }}>  {/* ✅ Added ref here */}
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
        About Us
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {["24/7 Customer Care", "Affordable Pricing", "Top Quality Service"].map((service, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                p: 3,
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {service}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default AboutUs;
