import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const userList = createAsyncThunk("user/userList", async () => {
  try {
    const response = await api.userList();
    return response.data;
  } catch (err) {
    return err.response.data;
  }
});

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const accumulatedPoints = createAsyncThunk(
  "user/accumulatedPoints",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.accumulatedPoints(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const points = createAsyncThunk(
  "user/points",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.points(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    // aPoints: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [userList.pending]: (state, action) => {
      state.loading = true;
    },
    [userList.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    },
    [userList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.splice(
        state.users.findIndex((item) => item.id === action.payload),
        1
      );
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [accumulatedPoints.pending]: (state, action) => {
      state.loading = true;
    },
    [accumulatedPoints.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    },
    [accumulatedPoints.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [points.pending]: (state, action) => {
      state.loading = true;
    },
    [points.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    },
    [points.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default userSlice.reducer;
