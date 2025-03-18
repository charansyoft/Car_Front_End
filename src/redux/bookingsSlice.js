import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user bookings
export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async () => {
  const { data } = await axios.get("http://localhost:5000/api/bookings");
  return data;
});

// Create a new booking
export const createBooking = createAsyncThunk("bookings/createBooking", async (bookingData) => {
  const { data } = await axios.post("http://localhost:5000/api/bookings", bookingData);
  return data;
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
      });
  },
});

export default bookingsSlice.reducer;
