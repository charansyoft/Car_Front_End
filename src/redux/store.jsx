import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice"; // Make sure this path is correct

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store; // Ensure you have this line
