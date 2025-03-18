import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Footer from "../components/Footer";
import UserFrontPageNavbar from "../components/UserFrontPageNavbar";

// Fetch products
const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/products");
  return data;
};

const UserViewProducts = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>❌ Error fetching products.</p>;

  return (
    <div>
      <UserFrontPageNavbar/>
      <h2 style={{ textAlign: "center", color: "#004d4d" }}>Products</h2>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ boxShadow: 3, backgroundColor: "#f0f8ff" }}>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000${product.image}`}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">Price: ${product.price}</Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleOpenDetails(product)} // Open the details modal
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Details Popup */}
      <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle>
              {selectedProduct.name}
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseDetails}
                aria-label="close"
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <img
                src={`http://localhost:5000${selectedProduct.image}`}
                alt={selectedProduct.name}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
              />
              <Typography variant="body1">Price: ${selectedProduct.price}</Typography>
              <Typography variant="body2">Fuel Type: {selectedProduct.fuelType}</Typography>
              <Typography variant="body2">Gear: {selectedProduct.transmission}</Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={handleCloseDetails}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Footer />
    </div>
  );
};

export default UserViewProducts;
