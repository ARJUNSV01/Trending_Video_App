import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverURL } from "../serverUrl";

const initialState = {
  user: null,
  signUpError: false,
  isRegistered: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isLoggedIn: false,
};

export const signUpUser = createAsyncThunk(
  "users/signUp",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${serverURL}/api/users/signup`,
        userData
      );
      const { token } = data;
      console.log(data);
      toast.success("Signup Successful");
      localStorage.setItem("access_token", JSON.stringify(token));

      return { ...data };
    } catch (error) {
      console.log(error);
      toast.error("Email already exists");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "users/login",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${serverURL}/api/users/login`,
        userData,
        { withCredentials: true }
      );
      const { token } = data;
      console.log(data);
      toast.success("Authentication Successful");
      localStorage.setItem("access_token", JSON.stringify(token));
      return { ...data };
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.name;
      state.userId = action.payload.id;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [signUpUser.fulfilled]: (state, action) => {
      state.user = action.payload.name;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.isRegistered = true;
      state.signUpError = false;
      state.message = "User has been created";
    },
    [signUpUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signUpUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.signUpError = true;
      state.message = action.payload.message;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload.name;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.loginError = false;
      state.message = "User logged in  ";
      state.isLoggedIn = true;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.user = null;
      state.email = null;
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.loginError = true;
      state.message = action.payload.message;
      state.isLoggedIn = false;
    },
  },
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
