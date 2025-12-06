import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/Axios.js";

export const createProperty = createAsyncThunk(
  "property/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/property/createproperty", data, {
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

export const getAllProperty = createAsyncThunk(
  "/property/getallproperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/property/getallproperties", {
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

export const createOwner = createAsyncThunk(
  "property/createowner",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/property/createowner", data, {
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

export const removeOwner = createAsyncThunk(
  "property/removeowner",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/property/removeowner", data, {
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

export const updateProperty = createAsyncThunk(
  "property/updateproperty",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/property/updateproperty/${data.id}`,
        data.data,
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

export const getFilteredProperties = createAsyncThunk(
  "property/getfilteredproperties",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/property/getfilteredproperties",
        data,
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

export const deleteProperty = createAsyncThunk(
  "property/delete",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/property/deleteproperty", {
        data, // axios delete me body bhejne ke liye
        withCredentials: true,
      });
      return { ...response.data, propertyId: data.propertyId }; // propertyId return karenge state update ke liye
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Request failed";
      return rejectWithValue(message);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    owner: {},
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.fulfilled, (state, action) => {
        state.properties = [...state.properties, action.payload];
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.properties = [];
      })
      .addCase(createProperty.pending, (state, action) => {
        state.properties = [];
      })
      .addCase(createOwner.fulfilled, (state, action) => {
        state.owner = action.payload;
      })
      .addCase(createOwner.rejected, (state, action) => {
        state.owner = {};
      })
      .addCase(createOwner.pending, (state, action) => {
        state.owner = {};
      })
      .addCase(getAllProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProperty.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
      })
      .addCase(removeOwner.fulfilled, (state, action) => {
        state.owner = {};
      })
      .addCase(removeOwner.rejected, (state, action) => {
        state.owner = {};
      })
      .addCase(removeOwner.pending, (state, action) => {
        state.owner = {};
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.properties = state.properties.map((property) =>
          property._id === action.payload._id ? action.payload : property
        );
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.properties = [];
      })
      .addCase(updateProperty.pending, (state, action) => {
        state.properties = [];
      })
      .addCase(getFilteredProperties.fulfilled, (state, action) => {
        state.properties = action.payload.properties;
      })
      .addCase(getFilteredProperties.rejected, (state, action) => {
        state.properties = [];
      })
      .addCase(getFilteredProperties.pending, (state, action) => {
        state.properties = [];
      })
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        // state.properties se deleted property ko remove kar do
        state.properties = state.properties.filter(
          (property) => property._id !== action.payload.propertyId
        );
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default propertySlice.reducer;
