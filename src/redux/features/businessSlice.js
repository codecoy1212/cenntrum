import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createBusiness = createAsyncThunk(
  "business/createBusiness",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createBusiness(formValue);
      navigate("/menu");
      window.location.reload();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const businessList = createAsyncThunk(
  "business/businessList",
  async () => {
    try {
      const response = await api.businessList();
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const businessDetail = createAsyncThunk(
  "business/businessDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.businessDetail(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const updateIncentive = createAsyncThunk(
//   "incentive/updateIncentive",
//   async ({ id, formValue, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.updateIncentive(formValue, id);
//       navigate("/incentives");
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const deleteBusiness = createAsyncThunk(
  "business/deleteBusiness",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteBusiness(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const businessSlice = createSlice({
  name: "business",
  initialState: {
    business: {},
    businesses: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createBusiness.pending]: (state, action) => {
      state.loading = true;
    },
    [createBusiness.fulfilled]: (state, action) => {
      state.loading = false;
      state.businesses = [action.payload];
    },
    [createBusiness.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [businessList.pending]: (state, action) => {
      state.loading = true;
    },
    [businessList.fulfilled]: (state, action) => {
      state.loading = false;
      state.businesses = action.payload.data;
    },
    [businessList.rejected]: (state, action) => {
      state.loading = true;
    },

    [businessDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [businessDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.businesses = action.payload.data;
    },
    [businessDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deleteBusiness.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteBusiness.fulfilled]: (state, action) => {
      state.loading = false;
      state.businesses.splice(
        state.businesses.findIndex((item) => item.id === action.payload),
        1
      );
    },
    [deleteBusiness.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default businessSlice.reducer;
