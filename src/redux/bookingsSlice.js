import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user bookings
export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async () => {
  const { data } = await axios.get("http://localhost:5000/api/bookings/user", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
});

// Create a new booking
export const createBooking = createAsyncThunk("bookings/createBooking", async (bookingData) => {
  const { data } = await axios.post("http://localhost:5000/api/bookings", bookingData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return data;
});

// ✅ Delete a booking
export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (bookingId) => {
  await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return bookingId;
});

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: { bookings: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.status = "succeeded";
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      // ✅ Handle delete booking
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((booking) => booking._id !== action.payload);
      });
  },
});

export default bookingsSlice.reducer;
