import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const updateSetting = createAsyncThunk(
  "appSetting/updateSetting",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateSetting(formValue);
      navigate("/menu");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSetting = createAsyncThunk(
  "appSetting/getSetting",
  async () => {
    try {
      const response = await api.getSetting();
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

const settingSlice = createSlice({
  name: "appSetting",
  initialState: {
    appSetting: {},
    appSettings: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [updateSetting.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSetting.fulfilled]: (state, action) => {
      state.loading = false;
      state.appSettings = [action.payload];
    },
    [updateSetting.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [getSetting.pending]: (state, action) => {
      state.loading = true;
    },
    [getSetting.fulfilled]: (state, action) => {
      state.loading = false;
      state.appSettings = action.payload.data;
    },
    [getSetting.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default settingSlice.reducer;
