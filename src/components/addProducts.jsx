import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { CloudUpload, Send, Close } from "@mui/icons-material"; // MUI Icons

const AddProducts = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // ✅ Validation Schema - All fields are required
  const validationSchema = Yup.object({
    name: Yup.string().required("Field is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Field is required")
      .positive("Price must be positive"),
    transmission: Yup.string()
      .oneOf(["Auto", "Manual"], "Invalid selection")
      .required("Field is required"),
    fuelType: Yup.string()
      .oneOf(["Petrol", "Diesel"], "Invalid selection")
      .required("Field is required"),
    image: Yup.mixed().required("Field is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      transmission: "",
      fuelType: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("transmission", values.transmission);
      formData.append("fuelType", values.fuelType);
      formData.append("image", values.image);

      try {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setOpenSnackbar(true); // Show success message
        resetForm();
        setImagePreview(null);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
  });

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 14,mb: 4, p: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Add Car Details 🚗
        </Typography>

        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          {/* Car Name */}
          <TextField
            fullWidth
            label="Car Name"
            name="name"
            variant="outlined"
            margin="normal"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* Price */}
          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            variant="outlined"
            margin="normal"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.price}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          {/* Transmission */}
          <FormControl fullWidth margin="normal" error={formik.touched.transmission && Boolean(formik.errors.transmission)}>
  <Select
    name="transmission"
    value={formik.values.transmission}
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    displayEmpty
    renderValue={(selected) => (selected ? selected : "Select Transmission")}
  >
    <MenuItem value="Auto">Automatic</MenuItem>
    <MenuItem value="Manual">Manual</MenuItem>
  </Select>
  {formik.touched.transmission && formik.errors.transmission && (
    <Typography color="error" variant="body2">
      {formik.errors.transmission}
    </Typography>
  )}
</FormControl>

<FormControl fullWidth margin="normal" error={formik.touched.fuelType && Boolean(formik.errors.fuelType)}>
  <Select
    name="fuelType"
    value={formik.values.fuelType}
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    displayEmpty
    renderValue={(selected) => (selected ? selected : "Select Fuel Type")}
  >
    <MenuItem value="Petrol">Petrol</MenuItem>
    <MenuItem value="Diesel">Diesel</MenuItem>
  </Select>
  {formik.touched.fuelType && formik.errors.fuelType && (
    <Typography color="error" variant="body2">
      {formik.errors.fuelType}
    </Typography>
  )}
</FormControl>


          {/* Upload Image */}
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
            startIcon={<CloudUpload />}
          >
            Upload Image
            <input
              type="file"
              name="image"
              hidden
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                if (file) {
                  formik.setFieldValue("image", file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
          </Button>

          {/* Image Preview */}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ width: "100%", marginTop: 10, borderRadius: 5 }} />
          )}
          {formik.touched.image && formik.errors.image && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {formik.errors.image}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            startIcon={<Send />}
          >
            Submit
          </Button>
        </form>
      </CardContent>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <IconButton size="small" color="inherit" onClick={() => setOpenSnackbar(false)}>
            <Close fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          ✅ Product added successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AddProducts;
