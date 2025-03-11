import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice"; // Make sure this path is correct
import contactReducer from "./contactSlice";
import authReducer from "./authSlice"; // Import your auth slice

const store = configureStore({
  reducer: {
    theme: themeReducer,
    contact: contactReducer,
    auth: authReducer,
  },
});

export default store; // Ensure you have this line




