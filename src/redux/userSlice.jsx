import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: "", // "customer" or "owner"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.role = "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
