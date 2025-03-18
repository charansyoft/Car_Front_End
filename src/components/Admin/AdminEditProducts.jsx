import {
  Alert,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer";
import UserFrontPageNavbar from "../UserFrontPageNavbar";
import HostOptions from "./AdminOptions";

// ✅ Fetch single product by ID
const fetchProductById = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const AdminEditProducts = () => {
  const { id } = useParams(); // ✅ Get product ID from URL
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Fetch the product using React Query
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // ✅ Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    transmission: "",
    fuelType: "",
  });

  // ✅ Pre-fill form when product loads
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        transmission: product.transmission || "",
        fuelType: product.fuelType || "",
      });
    }
  }, [product]);

  // ✅ Update product mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedProduct) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found! Please log in again.");

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      navigate("/AdminViewProducts");
    },
    onError: (error) => {
      console.error("❌ Update Error:", error.response?.data || error.message);
    },
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  // ✅ Loading state
  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6">Loading product details...</Typography>
      </Container>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Alert severity="error">Failed to load product: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <div>
      <UserFrontPageNavbar />
      <HostOptions />
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Fuel Type"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading ? "Updating..." : "Update Product"}
          </Button>
        </form>

        {updateMutation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Failed to update product!
          </Alert>
        )}

        {updateMutation.isSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Product updated successfully!
          </Alert>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default AdminEditProducts;
