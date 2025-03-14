import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initially no user data
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Save user data in the state
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { setUser, logout } = userSlice.actions; // Export the actions

export default userSlice.reducer; // Export the reducer
