import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/Axios.js";


// ============================================
//  GET ALL USERS
// ============================================
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/property/getallusers", {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Request failed";
      return rejectWithValue(message);
    }
  }
);


// ============================================
//  ADMIN SLICE
// ============================================
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    usersLoading: false,
    usersError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    // GET ALL USERS
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.users = [];
        state.usersError = action.payload;
      });
  },
});

export default adminSlice.reducer;
