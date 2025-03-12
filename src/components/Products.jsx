import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{ marginTop: "150px", marginBottom: "50px" }}
    >
      <Button
        component={Link}
        to="/viewProducts"
        variant="contained"
        color="secondary"
      >
        View Product
      </Button>
      <Button
        component={Link}
        to="/addProducts"
        variant="contained"
        color="secondary"
      >
        Add Product
      </Button>
    </Box>
  );
};

export default Products;
