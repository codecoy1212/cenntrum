import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const earnedList = createAsyncThunk(
  "earnedPoint/earnedList",
  async () => {
    try {
      const response = await api.earnedList();
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const searchEarned = createAsyncThunk(
  "earnedPoint/searchEarned",
  async ({ from, to }, { rejectWithValue }) => {
    try {
      const response = await api.searchEarned({ from, to });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const filterEarned = createAsyncThunk(
  "earnedPoint/searchEarned",
  async ({ from, to }, { rejectWithValue }) => {
    try {
      const response = await api.filterEarned({ from, to });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const earnedSlice = createSlice({
  name: "earnedPoint",
  initialState: {
    earnedPoint: {},
    earnedPoints: [],
    searchEarnedPoints: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [earnedList.pending]: (state, action) => {
      state.loading = true;
    },
    [earnedList.fulfilled]: (state, action) => {
      state.loading = false;
      state.earnedPoints = action.payload.data;
    },
    [earnedList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchEarned.pending]: (state, action) => {
      state.loading = true;
    },
    [searchEarned.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchEarnedPoints = action.payload.data;
    },
    [searchEarned.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default earnedSlice.reducer;
