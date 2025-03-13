import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import authReducer from "./authSlice"; // Import your auth slice
// import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    contact: contactReducer,
    auth: authReducer,
    // product: productReducer,
  },
});

export default store; // Ensure you have this line




