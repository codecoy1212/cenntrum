import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const sendGift = createAsyncThunk(
  "gift/sendGift",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.sendGift(formValue);
      navigate("/menu");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const giftSlice = createSlice({
  name: "gift",
  initialState: {
    gift: {},
    gifts: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [sendGift.pending]: (state, action) => {
      state.loading = true;
    },
    [sendGift.fulfilled]: (state, action) => {
      state.loading = false;
      state.gifts = [action.payload];
    },
    [sendGift.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default giftSlice.reducer;
