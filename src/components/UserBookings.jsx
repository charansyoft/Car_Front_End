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
} from "@mui/material";
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

        // Fetch user bookings
        axios
          .get("http://localhost:5000/api/bookings/user", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            // ✅ Only display bookings where user & product exist
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

  return (
    <div>
      <UserFrontPageNavbar />
      <Box sx={{ padding: 4, minHeight: "70vh", backgroundColor: "#F4F4F4" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 3 }}
        >
          My Cart
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <CircularProgress />
          </Box>
        ) : bookings.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#757575",
              fontStyle: "italic",
            }}
          >
            No bookings found.
          </Typography>
        ) : (
          bookings.map((booking) => (
            <Card
              key={booking._id}
              sx={{
                maxWidth: "90%",
                margin: "auto",
                marginBottom: 3,
                padding: 2,
                boxShadow: 3,
                backgroundColor: "#FFF",
                display: "flex",
                flexDirection: "row", // ✅ Image & details side by side
                alignItems: "center",
                borderRadius: 3,
              }}
            >
              {/* ✅ Product Image on the Left */}
              <CardMedia
                component="img"
                image={`http://localhost:5000${booking.productId.image}`} // ✅ Add base URL
                alt={booking.productId.title}
                sx={{
                  width: 300, // ✅ Increased width
                  height: 200, // ✅ Increased height
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                  marginRight: 3,
                }}
              />

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {booking.productId.title} {/* ✅ Display Product Name */}
                </Typography>
                <Typography sx={{ color: "#616161" }}>
                  Price: ${booking.price}
                </Typography>
                <Typography sx={{ color: "#616161" }}>
                  Fuel Type: {booking.fuelType}
                </Typography>
                <Typography sx={{ color: "#616161" }}>
                  Transmission: {booking.transmission}
                </Typography>
                <Typography sx={{ color: "#0288D1", fontSize: "14px" }}>
                  Booked on: {new Date(booking.createdAt).toLocaleString()}
                </Typography>
                
              </CardContent>
            </Card>
          ))
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default UserBookings;
