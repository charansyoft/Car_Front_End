import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardMedia, Grid, Typography, Button } from "@mui/material";
import axios from "axios";

// Fetch products from Products model
const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/products");
  return data;
};

// Book product API call
const bookProduct = async (bookingData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: Please log in first.");

  const { data } = await axios.post("http://localhost:5000/api/bookings", bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

// Like product API call
const likeProduct = async (likeData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: Please log in first.");

  const { data } = await axios.post("http://localhost:5000/api/liked", likeData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

const UserViewProducts = () => {
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Book product mutation
  const bookProductMutation = useMutation({
    mutationFn: bookProduct,
    onSuccess: () => {
      alert("Booked Successfully! 🎉");
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: (error) => {
      alert(error.response?.data?.error || "Booking failed.");
    },
  });

  // Like product mutation
  const likeProductMutation = useMutation({
    mutationFn: likeProduct,
    onSuccess: () => {
      alert("Liked Successfully! ❤️");
      queryClient.invalidateQueries(["liked"]);
    },
    onError: (error) => {
      alert(error.response?.data?.error || "Liking failed.");
    },
  });

  const handleBookProduct = (product) => {
    const bookingData = {
      productId: product._id,
      title: product.name,
      image: product.image,
      price: product.price,
      fuelType: product.fuelType,
      transmission: product.transmission,
    };
    bookProductMutation.mutate(bookingData);
  };

  const handleLikeProduct = (product) => {
    const likeData = {
      productId: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    };
    likeProductMutation.mutate(likeData);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>❌ Error fetching products.</p>;

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#004d4d" }}>Products</h2>
      <Grid container spacing={3} style={{ marginBottom: "25px" }}>
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

                {/* Like Button */}
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleLikeProduct(product)}
                  disabled={likeProductMutation.isLoading}
                >
                  {likeProductMutation.isLoading ? "Liking..." : "Like"}
                </Button>

                {/* Book Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleBookProduct(product)}
                  disabled={bookProductMutation.isLoading}
                >
                  {bookProductMutation.isLoading ? "Booking..." : "Book"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserViewProducts;
