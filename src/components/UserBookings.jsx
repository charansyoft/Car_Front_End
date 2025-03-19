import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserFrontPageNavbar from "./UserFrontPageNavbar";
import Footer from "../components/Footer";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);

        axios
          .get("http://localhost:5000/api/bookings/user", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const validBookings = response.data.filter(
              (booking) => booking.user && booking.productId
            );
            setBookings(validBookings);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching bookings:", error);
            setLoading(false);
          });
      } catch (error) {
        console.error("Invalid token", error);
        setLoading(false);
      }
    }
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setBookings(bookings.filter((booking) => booking._id !== id));
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  const totalCars = bookings.length;
  const totalPrice = bookings.reduce((sum, booking) => sum + booking.price, 0);

  return (
    <div>
      <UserFrontPageNavbar />
      <Box sx={{ padding: 3, minHeight: "70vh", backgroundColor: "#FAFAFA" }}>
        <Typography variant="h5" align="center" gutterBottom>
          My Cart
        </Typography>

        <Paper elevation={1} sx={{ p: 2, mb: 3, textAlign: "center", borderRadius: 2 }}>
          <Typography variant="body1">Total Cars: {totalCars}</Typography>
          <Typography variant="body1">Total Price: ${totalPrice.toLocaleString()}</Typography>
        </Paper>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <CircularProgress size={40} />
          </Box>
        ) : totalCars === 0 ? (
          <Typography align="center" color="textSecondary" fontStyle="italic">
            No bookings found.
          </Typography>
        ) : (
          bookings.map((booking) => (
            <Card
              key={booking._id}
              sx={{
                maxWidth: "90%",
                margin: "auto",
                marginBottom: 2,
                padding: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "#FFF",
              }}
            >
              <CardMedia
                component="img"
                image={`http://localhost:5000${booking.productId.image}`}
                alt={booking.productId.title}
                sx={{ width: 200, height: 150, objectFit: "cover", borderRadius: 1, marginRight: 2 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {booking.productId.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${booking.price.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Fuel Type: {booking.fuelType}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Transmission: {booking.transmission}
                </Typography>
              </CardContent>
              <IconButton onClick={() => handleDelete(booking._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Card>
          ))
        )}

        {totalCars > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
            <Button variant="outlined" size="medium" sx={{ borderRadius: 2 }}>
              Cash on Delivery (COD)
            </Button>
            <Button variant="contained" size="medium" sx={{ borderRadius: 2 }}>
              Online Payment
            </Button>
          </Box>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default UserBookings;