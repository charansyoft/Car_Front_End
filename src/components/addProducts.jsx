import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddProducts = () => {
  // State to manage success message
  const [showSuccess, setShowSuccess] = useState(false);

  // React Query Mutation for handling form submission
  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      return await axios.post("http://localhost:5000/api/products", newProduct);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      seats: "",
      price: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Product title is required"),
      seats: Yup.number()
        .typeError("Seats must be a number")
        .required("Seats are required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      addProductMutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          setShowSuccess(true); // Show success message
        },
        onError: (error) => {
          console.error("Error adding product:", error);
        },
      });
    },
  });

  // Hide success message after 3 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ marginTop: "150px", padding: "20px", maxWidth: "400px", mx: "auto" }}
    >
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Add Product
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Product Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          label="Seats"
          name="seats"
          type="number"
          value={formik.values.seats}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.seats && Boolean(formik.errors.seats)}
          helperText={formik.touched.seats && formik.errors.seats}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          sx={{ marginBottom: "20px" }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          fullWidth 
          disabled={addProductMutation.isLoading}
        >
          {addProductMutation.isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </form>

      {/* Success Snackbar */}
      <Snackbar open={showSuccess} autoHideDuration={3000} onClose={() => setShowSuccess(false)}>
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProducts;
