import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, deleteBooking } from "../redux/bookingsSlice";
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
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      dispatch(deleteBooking(bookingId));
    }
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

        {status === "loading" ? (
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