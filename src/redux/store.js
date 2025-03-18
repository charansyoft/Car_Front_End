import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import contactReducer from "./contactSlice";
import bookingsReducer from "./bookingsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
    bookings: bookingsReducer,
  },
});

export default store;
