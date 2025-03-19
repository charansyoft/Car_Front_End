import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Like a product
export const likeProduct = createAsyncThunk("likes/likeProduct", async (likeData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: Please log in.");

    const { data } = await axios.post("http://localhost:5000/api/liked", likeData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.likedProduct; // Return liked product
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Unlike a product
export const unlikeProduct = createAsyncThunk("likes/unlikeProduct", async (likeId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: Please log in.");

    await axios.delete(`http://localhost:5000/api/liked/${likeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return likeId;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Get liked products
export const fetchLikes = createAsyncThunk("likes/fetchLikes", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: Please log in.");

    const { data } = await axios.get("http://localhost:5000/api/liked", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data; // This includes populated product details
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const likeSlice = createSlice({
  name: "likes",
  initialState: { likedProducts: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.likedProducts = action.payload;
        state.status = "succeeded";
      })
      .addCase(likeProduct.fulfilled, (state, action) => {
        state.likedProducts.push(action.payload);
      })
      .addCase(unlikeProduct.fulfilled, (state, action) => {
        state.likedProducts = state.likedProducts.filter((like) => like._id !== action.payload);
      });
  },
});

export default likeSlice.reducer;
