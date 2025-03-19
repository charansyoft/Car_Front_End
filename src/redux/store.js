import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import contactReducer from "./contactSlice";
import bookingsReducer from "./bookingsSlice";
import likeReducer from "./likeSlice"; // Import likeSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
    bookings: bookingsReducer,
    likes: likeReducer, // Add like reducer
  },
});

export default store;
