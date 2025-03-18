import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import UserFrontPageNavbar from "../UserFrontPageNavbar";
import TwoButtonComponent from "./AdminOptions";

const AdminAddProducts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // React Query client for cache invalidation

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Ensure User is Logged In
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add products.");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Handle Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ React Query Mutation for Adding Product
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem("token");
      return await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      setOpenSnackbar(true);
      setName("");
      setPrice("");
      setTransmission("");
      setFuelType("");
      setImage(null);
      setImagePreview(null);
      queryClient.invalidateQueries(["products"]); // ✅ Refresh product list after adding
    },
    onError: (error) => {
      console.error("❌ Error adding product:", error);
      setErrorMessage(error.response?.data?.error || "Failed to add product");
    },
  });

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      setErrorMessage("Unauthorized! Please login first.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("transmission", transmission);
    formData.append("fuelType", fuelType);
    formData.append("image", image);

    console.log(
      "🔍 Sending Form Data:",
      Object.fromEntries(formData.entries())
    ); // Debugging

    mutation.mutate(formData);
  };

  return (
    <div>
      <UserFrontPageNavbar />
      <TwoButtonComponent />

      <Card sx={{ maxWidth: 500, margin: "auto", my: 5, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Product
          </Typography>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Price"
              type="number"
              variant="outlined"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            {/* ✅ Dropdown for Transmission */}
            <FormControl fullWidth required>
              <InputLabel>Transmission</InputLabel>
              <Select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                label="Transmission"
              >
                <MenuItem value="Auto">Automatic</MenuItem>
                <MenuItem value="Manual">Manual</MenuItem>
              </Select>
            </FormControl>

            {/* ✅ Dropdown for Fuel Type */}
            <FormControl fullWidth required>
              <InputLabel>Fuel Type</InputLabel>
              <Select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                label="Fuel Type"
              >
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="Electric">Electric</MenuItem>
              </Select>
            </FormControl>

            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                width="100%"
                height="150px"
                style={{ objectFit: "cover" }}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </CardContent>

        {/* ✅ Snackbar for Success Message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            ✅ Product added successfully!
          </Alert>
        </Snackbar>
      </Card>

      <Footer />
    </div>
  );
};

export default AdminAddProducts;
