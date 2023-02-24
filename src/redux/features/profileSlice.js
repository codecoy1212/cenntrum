import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const updateAdmin = createAsyncThunk(
  "profile/updateAdmin",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateAdmin(formValue);
      navigate("/menu");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    profiles: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [updateAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [updateAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.profiles = [action.payload];
    },
    [updateAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default profileSlice.reducer;
