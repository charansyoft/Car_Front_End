import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer"
import Navbar from "./Navbar"
import { Link } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const fetchProducts = async () => {
  const response = await axios.get("http://localhost:5000/api/products");
  return response.data;
};

const ViewProducts = ({ disableButtons }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const bookMutation = useMutation({
    mutationFn: async (bookingData) => {
      const response = await axios.post("http://localhost:5000/api/bookings", bookingData);
      return response.data;
    },
    onSuccess: () => {
      setSnackbarOpen(true);
      handleClose();
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.error("❌ Error booking product:", error.response?.data || error.message);
      alert("⚠️ Booking Failed! " + (error.response?.data?.message || "Please try again."));
    },
  });

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleBook = () => {
    if (!selectedProduct) return;
    const bookingData = {
      title: selectedProduct.name,
      image: selectedProduct.image,
      price: selectedProduct.price,
      fuelType: selectedProduct.fuelType,
      transmission: selectedProduct.transmission,
    };
    bookMutation.mutate(bookingData);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return (
    <div>
      {/* <Navbar /> */}
      <div style={{ padding: 20 }}>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Ensures full width
  }}
>
  {/* Left-aligned heading */}
  <h2 style={{ fontWeight: "bold" }}>Products</h2>

  {/* Right-aligned buttons */}
  <div style={{ display: "flex", gap: "10px" }}>
    {/* Add Products Button */}
    <Button
        component={Link}
        to="/AddProducts"
        sx={{
          backgroundColor: "#4CAF50", // Green
          color: "white",
          fontWeight: "bold",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: disableButtons ? "not-allowed" : "pointer", // 🚫 Blocked cursor
          opacity: disableButtons ? 0.6 : 1, // Reduce visibility when disabled
          pointerEvents: disableButtons ? "none" : "auto", // Disable clicks
          "&:hover": { backgroundColor: disableButtons ? "#4CAF50" : "#388E3C" }, // Keeps original color when disabled
        }}
      >
        Add Products
      </Button>

      {/* Bookings Button */}
      <Button
        component={Link}
        to="/Bookings"
        sx={{
          backgroundColor: "#1565C0", // Deep blue
          color: "white",
          fontWeight: "bold",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: disableButtons ? "not-allowed" : "pointer",
          opacity: disableButtons ? 0.6 : 1,
          pointerEvents: disableButtons ? "none" : "auto",
          "&:hover": { backgroundColor: disableButtons ? "#1565C0" : "#0D47A1" },
        }}
      >
        Booking
      </Button>

  </div>
</div>




      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image ? `http://localhost:5000${product.image}` : "https://via.placeholder.com/200"}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">Price: ${product.price}</Typography>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <IconButton sx={{ color: "red" }}>
                    <FavoriteIcon sx={{ color: "transparent", stroke: "red", strokeWidth: 2 }} />
                  </IconButton>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(product)}>
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Details Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <img
                src={selectedProduct.image ? `http://localhost:5000${selectedProduct.image}` : "https://via.placeholder.com/200"}
                alt={selectedProduct.name}
                style={{ width: "100%", borderRadius: 5 }}
              />
              <Typography variant="h6">Price: ${selectedProduct.price}</Typography>
              <Typography variant="body1">Fuel Type: {selectedProduct.fuelType}</Typography>
              <Typography variant="body1">Gear: {selectedProduct.transmission}</Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" color="primary" onClick={handleBook} disabled={bookMutation.isLoading}>
                {bookMutation.isLoading ? "Booking..." : "Book"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Booking Success Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          ✅ Booking Successful!
        </Alert>
      </Snackbar>
    </div>
    <Footer />
    </div>
    
  );
};

export default ViewProducts;