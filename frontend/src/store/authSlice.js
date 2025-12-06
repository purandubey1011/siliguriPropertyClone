import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/Axios.js";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  message: null,
  error: null,
};

export const ResgisterUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      console.info(data);
      const response = await axios.post("/auth/register", data, {
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

export const getCurrentUser = createAsyncThunk(
  "auth/getcurrentuser",
  async (data, { rejectWithValue }) => {
    try {
      console.info(data);
      const response = await axios.get("/auth/getcurrentuser", {
        withCredentials: true,
      });
      console.log("currentuser",response.data);
      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Request failed";
      return rejectWithValue(message);
    }
  }
);


export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/auth/update-profile", data, {
        withCredentials: true,
      });
      console.log("dhhh",response.data)
      return response.data; // should return updated user
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Profile update failed!";
      return rejectWithValue(message);
    }
  }
);


export const LoginInUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      console.info(data);
      const response = await axios.post("/auth/login", data, {
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

export const logOutUser = createAsyncThunk(
  "/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Request failed";
      return rejectWithValue(message);
    }
  }
);

// --- FORGOT PASSWORD ---
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/forgot-password", data, {
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

// --- RESET PASSWORD ---
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      return data;
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong!";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload || {};
      state.user = user ?? null;
      state.token = token ?? null;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ResgisterUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload?.message || "Registered successfully";
        state.error = null;
      })
      .addCase(ResgisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.token = null;
        state.error = action.payload || "Registration failed";
        state.message = null;
      })
      .addCase(ResgisterUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(LoginInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload?.message || "Registered successfully";
        state.error = null;
      })
      .addCase(LoginInUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.token = null;
        state.error = action.payload || "Registration failed";
        state.message = null;
      })
      .addCase(LoginInUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.token = null;
        state.message = action.payload?.message || "Logged out successfully";
        state.error = null;
        localStorage.removeItem("authState");
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Logout failed";
        state.message = null;
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload?.message || "Registered successfully";
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.token = null;
        state.error = action.payload || "Registration failed";
        state.message = null;
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })


      .addCase(updateProfile.pending, (state) => {
  state.status = "loading";
  state.message = null;
  state.error = null;
})
.addCase(updateProfile.fulfilled, (state, action) => {
  state.status = "succeeded";
  state.user = action.payload?.user;
  state.message = action.payload?.message || "Profile updated successfully!";
  state.error = null;
})
.addCase(updateProfile.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.payload || "Profile update failed!";
  state.message = null;
})

      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message =
          action.payload?.message || "Reset link sent successfully!";
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.message = null;
        state.error = action.payload || "Failed to send reset link!";
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message =
          action.payload?.message || "Password reset successfully!";
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.message = null;
        state.error = action.payload || "Password reset failed!";
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectIsAdmin = (state) => {
  const user = state.auth.user;

  if (!user) return "none";
  return user?.usertype;
};
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthMessage = (state) => state.auth.message;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
