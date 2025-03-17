import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Products = () => {
  return (
    <div>
<Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{ marginTop: "150px", marginBottom: "50px" }}
    >
      <Navbar />
      <Button
        component={Link}
        to="/ViewProducts"
        variant="contained"
        color="primary"
      >
        View Product
      </Button>
      <Button
        component={Link}
        to="/AddProducts"
        variant="contained"
        color="secondary"
      >
        Add Product
      </Button>
      
    </Box>
    <Footer />
    </div>
    
    
  );
};

export default Products;
