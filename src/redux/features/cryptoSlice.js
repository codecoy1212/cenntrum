import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const sendCrypto = createAsyncThunk(
  "crypto/sendCrypto",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.sendCrypto(formValue);
      navigate("/menu");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    crypto: {},
    cryptos: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [sendCrypto.pending]: (state, action) => {
      state.loading = true;
    },
    [sendCrypto.fulfilled]: (state, action) => {
      state.loading = false;
      state.cryptos = [action.payload];
    },
    [sendCrypto.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default cryptoSlice.reducer;
