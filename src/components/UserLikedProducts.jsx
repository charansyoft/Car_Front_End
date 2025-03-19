import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Grid, Card, CardContent, CardMedia, Typography, CircularProgress, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; // Minimal delete icon
import axios from "axios";
import UserFrontPageNavbar from "./UserFrontPageNavbar";
import Footer from "./Footer";

// Fetch liked products
const fetchLikedProducts = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: Please log in first.");

  const { data } = await axios.get("http://localhost:5000/api/liked", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

// Delete liked product
const deleteLikedProduct = async (likeId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: Please log in first.");

  await axios.delete(`http://localhost:5000/api/liked/${likeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return likeId;
};

const UserLikedProducts = () => {
  const queryClient = useQueryClient();
  
  const { data: likedProducts = [], isLoading, isError } = useQuery({
    queryKey: ["liked"],
    queryFn: fetchLikedProducts,
  });

  const mutation = useMutation({
    mutationFn: deleteLikedProduct,
    onSuccess: (likeId) => {
      queryClient.setQueryData(["liked"], (oldData) => oldData.filter((product) => product._id !== likeId));
    },
  });

  const handleUnlike = (likeId) => {
    if (window.confirm("Are you sure you want to remove this product from liked?")) {
      mutation.mutate(likeId);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" color="error">Error fetching liked products.</Typography>
      </Container>
    );
  }

  return (
    <div>
      <UserFrontPageNavbar />
      <Container sx={{ mt: 5, mb:5 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}>
          Your Liked Products ❤️
        </Typography>

        <Grid container spacing={4}>
          {likedProducts.length === 0 ? (
            <Typography variant="h5" align="center" sx={{ width: "100%", mt: 3, fontStyle: "italic" }}>
              No liked products yet.
            </Typography>
          ) : (
            likedProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ boxShadow: 5, borderRadius: "15px", backgroundColor: "#f9f9f9" }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    sx={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif", color: "#555" }}>
                      Price: ${product.price}
                    </Typography>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: "red", mt: 1 }}
                      onClick={() => handleUnlike(product._id)}
                    >
                      <DeleteOutlineIcon fontSize="large" /> {/* Bigger delete icon */}
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default UserLikedProducts;
