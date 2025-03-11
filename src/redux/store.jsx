import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import authReducer from "./authSlice"; // Import your auth slice

const store = configureStore({
  reducer: {
    contact: contactReducer,
    auth: authReducer,
  },
});

export default store; // Ensure you have this line




