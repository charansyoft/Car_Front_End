import React from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminOptions = () => {
  const navigate = useNavigate();

  return (
    <Stack style={{margin:40}}  direction="row" spacing={2} justifyContent="center">
      <Button variant="contained" color="primary" onClick={() => navigate("/AdminAddProducts")}>
        Add Product
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate("/AdminViewProducts")}>
        View Products
      </Button>
    </Stack>
  );
};

export default AdminOptions;

