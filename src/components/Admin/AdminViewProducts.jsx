import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Footer from "../Footer";
import UserFrontPageNavbar from "../UserFrontPageNavbar";
import HostOptions from "./AdminOptions";

// ✅ Fetch products using React Query
const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/products");
  return data;
};

const AdminViewProducts = () => {
  const queryClient = useQueryClient();
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // ✅ DELETE MUTATION - Calls API to delete a product
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token"); // ✅ Retrieve token
      if (!token) throw new Error("No token found, please login again.");

      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Pass token in headers
      });
    },
    onSuccess: (_, id) => {
      setDeleteMessage(`✅ Product deleted successfully!`);
      setDeleteSnackbarOpen(true);
      queryClient.invalidateQueries(["products"]); // Refresh the product list
    },
    onError: (error) => {
      console.error(
        "❌ Error deleting product:",
        error.response?.data || error.message
      );
      setDeleteMessage("❌ Failed to delete product. Check authentication.");
      setDeleteSnackbarOpen(true);
    },
  });

  // 🔵 Handle Update Redirect
  const handleUpdate = (productId) => {
    window.location.href = `/edit-product/${productId}`;
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>❌ Error fetching products.</p>;

  return (
    <div>
      <UserFrontPageNavbar />
      <HostOptions />
      <div style={{ marginBottom: "30px" }}>
        <h2
          style={{ color: "#004d4d", fontWeight: "bold", textAlign: "center" }}
        >
          Products
        </h2>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ boxShadow: 3, backgroundColor: "#f0f8ff" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  sx={{ borderRadius: "8px 8px 0 0" }}
                />
                <CardContent>
                  <Typography variant="h6" color="#005f5f">
                    {product.name}
                  </Typography>
                  <Typography variant="body1">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Fuel Type: {product.fuelType}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Gear: {product.transmission}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "15px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#008080", // Soft teal
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#006666" },
                      }}
                      onClick={() => handleUpdate(product._id)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#b22222", // Muted red
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#8b1a1a" }, // Darker red on hover
                      }}
                      onClick={() => deleteMutation.mutate(product._id)}
                      disabled={deleteMutation.isLoading}
                    >
                      {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* ✅ DELETE SUCCESS/ERROR MESSAGE */}
      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setDeleteSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setDeleteSnackbarOpen(false)}
          severity={deleteMessage.includes("Failed") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {deleteMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default AdminViewProducts;
