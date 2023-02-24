import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createCoinPkg = createAsyncThunk(
  "coinPkg/createCoinPkg",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createCoinPkg(formValue);
      navigate("/coinPackages");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCoinPkg = createAsyncThunk(
  "coinPkg/updateCoinPkg",
  async ({ id, formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateCoinPkg(formValue, id);
      navigate("/coinPackages");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const coinPkgList = createAsyncThunk("coinPkg/coinPkgList", async () => {
  try {
    const response = await api.coinPkgList();
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteCoinPkg = createAsyncThunk(
  "coinPkg/deleteCoinPkg",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteCoinPkg(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const coinSlice = createSlice({
  name: "coinPkg",
  initialState: {
    coinPkg: {},
    coinPkgs: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createCoinPkg.pending]: (state, action) => {
      state.loading = true;
    },
    [createCoinPkg.fulfilled]: (state, action) => {
      state.loading = false;
      state.coinPkgs = [action.payload];
    },
    [createCoinPkg.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [coinPkgList.pending]: (state, action) => {
      state.loading = true;
    },
    [coinPkgList.fulfilled]: (state, action) => {
      state.loading = false;
      state.coinPkgs = action.payload.data;
    },
    [coinPkgList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCoinPkg.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCoinPkg.fulfilled]: (state, action) => {
      state.loading = false;
      state.coinPkgs = [action.payload];
    },
    [updateCoinPkg.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteCoinPkg.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCoinPkg.fulfilled]: (state, action) => {
      state.loading = false;
      state.coinPkgs.splice(
        state.coinPkgs.findIndex((item) => item.id === action.payload),
        1
      );
      // const {
      //   arg: { id },
      // } = action.meta;
      // if (id) {
      //   // state.userTours = state.userTours.filter((item) => item._id !== id);
      //   state.coinPkgs = state.coinPkgs.filter((item) => item.id !== id);
      // }
    },
    [deleteCoinPkg.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default coinSlice.reducer;
