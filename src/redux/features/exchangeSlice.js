import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const exchangeList = createAsyncThunk(
  "exchangePoint/exchangeList",
  async () => {
    try {
      const response = await api.exchangeList();
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const searchExchange = createAsyncThunk(
  "exchangePoint/searchExchange",
  async ({ from, to, type }, { rejectWithValue }) => {
    try {
      const response = await api.searchExchange({ from, to, type });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const filterExchange = createAsyncThunk(
  "exchangePoint/searchExchange",
  async ({ from, to, type }, { rejectWithValue }) => {
    try {
      const response = await api.filterExchange({ from, to, type });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const exchangeSlice = createSlice({
  name: "exchangePoint",
  initialState: {
    exchangePoints: [],
    searchExchangePoints: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [exchangeList.pending]: (state, action) => {
      state.loading = true;
    },
    [exchangeList.fulfilled]: (state, action) => {
      state.loading = false;
      state.exchangePoints = action.payload.data;
    },
    [exchangeList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [searchExchange.pending]: (state, action) => {
      state.loading = true;
    },
    [searchExchange.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchExchangePoints = action.payload.data;
    },
    [searchExchange.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default exchangeSlice.reducer;
