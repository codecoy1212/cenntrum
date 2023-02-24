import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createSubsPkg = createAsyncThunk(
  "subsPkg/createSubsPkg",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createSubsPkg(formValue);
      navigate("/addSubscription");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const subsPkgList = createAsyncThunk("subsPkg/subsPkgList", async () => {
  try {
    const response = await api.subsPkgList();
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteSubsPkg = createAsyncThunk(
  "coinPkg/deleteSubsPkg",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteSubsPkg(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSubsPkg = createAsyncThunk(
  "subsPkg/updateSubsPkg",
  async ({ id, formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateSubsPkg(formValue, id);
      navigate("/addSubscription");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subsPkg",
  initialState: {
    subsPkg: {},
    subsPkgs: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createSubsPkg.pending]: (state, action) => {
      state.loading = true;
    },
    [createSubsPkg.fulfilled]: (state, action) => {
      state.loading = false;
      state.subsPkgs = [action.payload];
    },
    [createSubsPkg.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateSubsPkg.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSubsPkg.fulfilled]: (state, action) => {
      state.loading = false;
      state.subsPkgs = [action.payload];
    },
    [updateSubsPkg.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [subsPkgList.pending]: (state, action) => {
      state.loading = true;
    },
    [subsPkgList.fulfilled]: (state, action) => {
      state.loading = false;
      state.subsPkgs = action.payload.data;
    },
    [subsPkgList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteSubsPkg.pending]: (state, action) => {
      state.loading = true;
    },

    [deleteSubsPkg.fulfilled]: (state, action) => {
      state.loading = false;
      state.subsPkgs.splice(
        state.subsPkgs.findIndex((item) => item.id === action.payload),
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
    [deleteSubsPkg.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default subscriptionSlice.reducer;
