import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  user: null, // To store user details if needed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    logout: (state) => {
      state.status = ""; // Clear login status
      state.user = null; // Clear user data if stored
    },
  },
});

// ✅ Export actions correctly
export const { setStatus, logout } = authSlice.actions;

// ✅ Export reducer
export default authSlice.reducer;
