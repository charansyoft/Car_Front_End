import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    status: "",
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = contactSlice.actions;
export default contactSlice.reducer;
