import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createIncentive = createAsyncThunk(
  "incentive/createIncentive",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(formValue).forEach(function (key) {
        formData.append(key, formValue[key]);
      });
      for (var pair of formData.entries()) {
        console.log(pair[0] + " - " + pair[1]);
      }
      const response = await api.createIncentive(formData);
      console.log(formValue);
      navigate("/menu");
      window.location.reload();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const incentiveList = createAsyncThunk(
  "incentive/incentiveList",
  async () => {
    try {
      const response = await api.incentiveList();
      return {
        data: {
          incentives: response.data.data,
          default_radius: response.data.default_radius.business_radius,
        },
      };
    } catch (err) {
      return err.response.data;
    }
  }
);

export const updateIncentive = createAsyncThunk(
  "incentive/updateIncentive",
  async ({ id, formValue, navigate }, { rejectWithValue }) => {
    try {
      var formData = new FormData();

      Object.keys(formValue).forEach(function (key) {
        // if (key === "img") {
        //   formData.append(key, null);
        // } else
        formData.append(key, formValue[key]);
      });
      for (var pair of formData.entries()) {
        console.log(pair[0] + " - " + pair[1]);
      }

      const response = await api.updateIncentive(formData, id);
      console.log(response);
      navigate("/incentives");
      window.location.reload();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteIncentive = createAsyncThunk(
  "incentive/deleteIncentive",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteIncentive(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const incentiveSlice = createSlice({
  name: "incentive",
  initialState: {
    incentive: {},
    incentives: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createIncentive.pending]: (state, action) => {
      state.loading = true;
    },
    [createIncentive.fulfilled]: (state, action) => {
      state.loading = false;
      state.incentives = [action.payload];
    },
    [createIncentive.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [incentiveList.pending]: (state, action) => {
      state.loading = true;
    },
    [incentiveList.fulfilled]: (state, action) => {
      state.loading = false;
      state.incentives = action.payload.data;
    },
    [incentiveList.rejected]: (state, action) => {
      state.loading = true;
    },

    [updateIncentive.pending]: (state, action) => {
      state.loading = true;
    },
    [updateIncentive.fulfilled]: (state, action) => {
      state.loading = false;
      state.incentives = [action.payload];
    },
    [updateIncentive.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deleteIncentive.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteIncentive.fulfilled]: (state, action) => {
      state.loading = false;
      state.incentives.splice(
        state.incentives.findIndex((item) => item.id === action.payload),
        1
      );
    },
    [deleteIncentive.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default incentiveSlice.reducer;
