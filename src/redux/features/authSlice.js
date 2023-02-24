import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      navigate("/");
      window.location.reload();
      return response.data;
      // // toast.success("Login Successfully");
      // if (response.status !== true) {
      // alert("email or password is incorrect");
      // } else {
      //   navigate("/home");
      //   return response.data;
      // }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const updateAdmin = createAsyncThunk(
//   "auth/updateAdmin",
//   async ({ formValue, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.updateAdmin(formValue);
//       navigate("/menu");
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// define slice
const authSlice = createSlice({
  //define slice name
  name: "auth",
  // define the initial state of our application
  initialState: {
    user: null,
    // users: [],
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      // we r going to save the all the data like id email pswrd and token in local storage.
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
