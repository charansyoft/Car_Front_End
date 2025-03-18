import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { Favorite, Close } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Footer from "./Footer";

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
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: "#004d4d", fontWeight: "bold", textAlign: "center" }}>
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
                  <Typography variant="body1">Price: ${product.price}</Typography>
                  <Typography variant="body2" color="gray">
                    Fuel Type: {product.fuelType}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Gear: {product.transmission}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: "#008080", color: "white" }}
                    onClick={() => handleOpenDetails(product)}
                  >
                    Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Details Popup */}
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
              <IconButton color="primary" aria-label="like">
                <Favorite />
              </IconButton>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={false} // You can enable this if you want to show an error message after trying any failed actions
        autoHideDuration={3000}
        onClose={() => {}}
      >
        <Alert severity="error">Booking failed! Please try again.</Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default UserViewProducts;
